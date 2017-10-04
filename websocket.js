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
            client.send('derp')
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };

    wss.on('connection', function connection(ws, req) {
        sessionmanager.sharedSession(req, {}, function () {
            req.session.save(function () {
                let user_id = req.session.passport.user;

                wss.clients.forEach(function each(client) {
                    // if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send("you're a wizard harry!");
                    // client.send(data);

                    // }
                });

                ws.on('message', function incoming(data) {
                    // let parsedData = createQuizExample;
                    // console.log(req);
                    // console.log(req.session.passport.user);
                    let parsedData = JSON.parse(data);
                    // let parsedData = createSurveyExample;
                    // console.log('inc Data')
                    // Broadcast to everyone else.
                    // sendToWebSocket("hey!")
                    // console.log(JSON.parse(data));
                    if (parsedData.type === 'CREATESURVEY') {
                        addQuizQuestionsAnswers(parsedData);
                    }
                    if (parsedData.type === 'ADDGUESTTOHOST') {
                        addGuestToHost(parsedData).then((resp) => {

                            if (resp.name === "SequelizeForeignKeyConstraintError") {
                                wss.clients.forEach(function each(client) {
                                    console.log(client);
                                    // if (client !== ws && client.readyState === WebSocket.OPEN) {
                                    // console.log(client);
                                    client.send("Error")
                                    // client.send(data);

                                    // }
                                });
                            }
                        });
                    }
                });
            })
        })
    })
}


function addQuizQuestionsAnswers(parsedData, host_id) {
    query.addSQ(parsedData['title'], host_id, 'quiz').then(resp => {
        addQuestionsAndAnswers(parsedData.question, resp.dataValues.sq_id);
    });
}


function addQuestionsAndAnswers(parsedData, sq_id) {
    parsedData.forEach((question) => {
        query.addQuestion(question['text'], question['question_number']).then(resp => {
            let question_id = resp.dataValues.question_id
            if (question['option'] !== undefined) {
                addOptions(question, parsedData, sq_id, question_id);
            } else {
                query.addSQQuestionOption(sq_id, question_id, null);
            }
        })
    })
}

function addOptions(question, parsedData, sq_id, question_id) {
    question.option.forEach((option) => {
        query.addOption(option.text, option.value).then(resp => {
            query.addSQQuestionOption(sq_id, question_id, resp.dataValues.option_id);
        })
    })
}

function addGuestToHost(parsedData) {
    return query.addHostGuest(parsedData['host_id'], parsedData['guest_id']).then(
        (resp) => {
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
