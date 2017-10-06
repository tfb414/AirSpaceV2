const WebSocket = require('ws');
const query = require('./queries');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
// const MemcachedStore = require('connect-memcached')(session);
const sessionmanager = require('./sessionmanager');
const ensureAuthenticated = require('./utils').ensureAuthenticated;

function init() {
    const wss = new WebSocket.Server({ port: 8080 });
    console.log('init ran')
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };

    wss.on('connection', function connection(ws, req) {
        sessionmanager.sharedSession(req, {}, function () {
            req.session.save(function () {
                let user_id = req.session.passport.user;

                // wss.clients.forEach(function each(client) {
                    // if (client !== ws && client.readyState === WebSocket.OPEN) {
                    // client.send("you're a wizard harry!");
                    // client.send(data);

                    // }
                // });

                ws.on('message', function incoming(data) {
                    console.log("WE GOT A MESSAGE");
                    // console.log(data);
                    let parsedData = JSON.parse(data);
                    if (parsedData.type === 'CREATESURVEYQUIZ') {
                        addQuizQuestionsAnswers(parsedData, user_id);
                    }
                    if (parsedData.type === 'ADDGUESTTOHOST') {
                        addGuestToHost(parsedData, user_id).then((resp) => {

                            if (resp.name === "SequelizeForeignKeyConstraintError") {
                                wss.clients.forEach(function each(client) {
                                    // if (client !== ws && client.readyState === WebSocket.OPEN) {
                                    // console.log(client);
                                    // client.send("Error");
                                    // console.log(client);

                                    // if (client !== ws && client.readyState === WebSocket.OPEN) {
                                    // console.log(client);
                                    client.send(JSON.stringify({ 'type': 'ERROR' }))
                                    // client.send(data);

                                    // }
                                });
                            } else {
                                wss.clients.forEach(function each(client) {
                                    client.send(JSON.stringify({
                                        'type': 'CONNECTEDTOHOST',
                                    }))
                                })
                            }
                        });
                    }
                    if (parsedData.type === 'GETUSERID') {
                        wss.clients.forEach(function each(client) {
                            let payload = {
                                type: 'RETURNUSERID',
                                user_id: user_id,
                                id: parsedData.id
                            }
                            client.send(JSON.stringify(payload));
                        })
                    }

                    if (parsedData.type === 'REQUESTRESULTS') {
                        query.getSQResultsHost(parsedData.sq_id, user_id)
                        .then((resp) => {
                            console.log(resp);
                        })
                    }
                });
            })
        })
    })
}


function addQuizQuestionsAnswers(parsedData, host_id) {
    query.addSQ(parsedData['title'], host_id, parsedData['value']).then(resp => {
        addQuestionsAndAnswers(parsedData.payload, resp.dataValues.sq_id);
    });
}


function addQuestionsAndAnswers(questions, sq_id) {
    questions.forEach((question) => {
        query.addQuestion(question['text'], question['question_number']).then(resp => {
            let question_id = resp.dataValues.question_id
            if (question['options'] !== undefined) {
                addOptions(question, sq_id, question_id);
            } else {
                query.addSQQuestionOption(sq_id, question_id, null);
            }
        })
    })
}

function addOptions(question, sq_id, question_id) {
    question.options.forEach((option) => {
        query.addOption(option.text, option.value).then(resp => {
            query.addSQQuestionOption(sq_id, question_id, resp.dataValues.option_id);
        })
    })
}

function addGuestToHost(parsedData, guest_id) {
    return query.addHostGuest(parsedData['host_id'], guest_id).then(resp => {
            return resp;
        }
    );
}




// function sendToWebSocket(message) {
//     socket.send(JSON.stringify(message));
// }

module.exports = {
    init
}
