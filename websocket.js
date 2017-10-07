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

                                    client.send(JSON.stringify({ 'type': 'ERROR' }))

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
                                let payload = formatResults(resp, user_id);
                                wss.clients.forEach(function each(client) {
                                    client.send(JSON.stringify(payload));
                                })
                            })
                    }

                    if (parsedData.type === 'REQUESTSQLIST') {
                        query.getSQList(user_id, parsedData.value).then(resp => {
                            let payload = formatSQList(resp, user_id);
                            wss.clients.forEach(function each(client) {
                                client.send(JSON.stringify(payload));
                            })
                        })
                    }
                    query.getSQ('18')
                    .then(resp => {
                        let payload = formatSQList(resp, 'sabbey37@gmail.com', 'quiz');
                    })

                    if (parsedData.type === 'ACTIVATESQ') {
                        query.getSQ(parsedData.sq_id).then(resp => {
                            let payload = formatSQList(resp, parsedData.host_id, parsedData.sqtype);
                            wss.clients.forEach(function each(client) {
                                client.send(JSON.stringify(payload));
                            })
                        })
                    }
                });
            })
        })
    })
}

// "title": "This is a survey",
//                 "payload": [{ "question_number": 1, "text": "derp derp derp " }, { "question_number": 2, "text": "trees or air" }, { "question_number": 3, "text": "mountains or oceans" }]

function formatSQ(resp, host_id) {
    console.log(resp);
    let result = {};
    result["type"] = "DISPLAYACTIVESQ";
    result["host_id"] = host_id;
    result["payload"] = resp;
}

function formatSQList(resp, user_id) {
    let result = {};
    result["type"] = "DISPLAYSQLIST";
    result["host_id"] = user_id;
    result["payload"] = resp;
    return result;
}

// Formats payload for results of survey
function formatResults(resp, user_id) {
    let result = {};
    result["type"] = "DISPLAYRESULTS";
    result["host_id"] = user_id;
    result["title"] = resp[0]["sq_name"];
    result["payload"] = {};
    resp.forEach((person) => {
        let email = person.guest_id;
        if (!(email in result.payload)) {
            result.payload[email] = {};
            result.payload[email].first_name = person.first_name;
            result.payload[email].last_name = person.last_name;
            result.payload[email].question = [];
        }
        let question_obj = {};
        question_obj["text"] = person.question;
        question_obj["response"] = person.response;
        if (person.response === null) {
            question_obj["response"] = person.option_text;
            question_obj["value"] = person.option_value;
        }
        result.payload[email].question.push(question_obj);
    })
    return result;

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

function ActivateSurvey(payload, wss) {
    console.log('we are sending a messages to activate survey');

    wss.clients.forEach(function each(client) {

        client.send(JSON.stringify(payload))
    });
}




// function sendToWebSocket(message) {
//     socket.send(JSON.stringify(message));
// }

module.exports = {
    init
}
