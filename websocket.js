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
                let user_id = req.session.passport.user.email;
                let first_name = req.session.passport.user.firstname;
                let last_name = req.session.passport.user.lastname;

                ws.on('message', function incoming(data) {
                    let parsedData = JSON.parse(data);
                    switch (parsedData.type) {
                        case 'CREATESQ':
                            addQuizQuestionsAnswers(parsedData, user_id);
                            break;


                        case 'ADDGUESTTOHOST':
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
                            break;

                        case "HEARTBEAT":
                            sendHeartbeat(wss, parsedData, user_id);
                            break;

                        case "GUESTHEARTBEAT":
                            sendHeartbeatToHost(wss, parsedData);
                            break;

                        case 'GETUSERID':
                            wss.clients.forEach(function each(client) {
                                let payload = {
                                    type: 'RETURNUSERID',
                                    user_id: user_id,
                                    id: parsedData.id,
                                    first_name,
                                    last_name
                                }
                                client.send(JSON.stringify(payload));
                            })
                            break;

                        case 'REQUESTRESULTS':
                            query.getSQResultsHost(parsedData.sq_id, user_id).then((resp) => {
                                if (resp.length !== 0) {
                                    let payload = formatResults(resp, user_id, parsedData.sqtype);
                                    sendPayload(payload, wss)
                                } else {
                                    let hostpayload = {
                                        type: "DISPLAYRESULTS",
                                        sq_id: parsedData.sq_id,
                                        host_id: user_id,
                                        sqtype: parsedData.sqtype,
                                        error: `No results found for this ${parsedData.sqtype}`
                                    };
                                    sendPayload(hostpayload, wss);
                                }
                            })
                            break;

                        case 'REQUESTSQLIST':
                            query.getSQList(user_id, parsedData.sqtype).then(resp => {
                                if (resp.length !== 0) {
                                    let payload = formatSQList(resp, user_id);
                                    sendPayload(payload, wss);
                                } else {
                                    let payload = {
                                        type: "DISPLAYSQLIST",
                                        host_id: user_id,
                                        error: `Nothing found.`
                                    }
                                }
                            })
                            break;

                        case 'ACTIVATESQ':
                            query.getSQ(parsedData.sq_id).then(resp => {
                                if (resp.length !== 0) {
                                    let payload = formatSQ(resp, user_id, parsedData.sqtype);
                                    sendPayload(payload, wss);
                                    let hostpayload = {
                                        type: "ACTIVATEDSQ",
                                        title: resp[0]["sq_name"],
                                        sq_id: parsedData.sq_id,
                                        title: resp[0]["sq_name"],
                                        host_id: user_id,
                                        sqtype: parsedData.sqtype,
                                        error: null
                                    };
                                    sendPayload(hostpayload, wss);
                                } else {
                                    let hostpayload = {
                                        type: "ACTIVATEDSQ",
                                        sq_id: parsedData.sq_id,
                                        host_id: user_id,
                                        sqtype: parsedData.sqtype,
                                        error: "No questions found"
                                    };
                                    sendPayload(hostpayload, wss);
                                }
                            })
                            break;

                        case 'RESULTQUIZ':
                            parsedData.payload.forEach(result => {
                                query.addGQRQuiz(user_id, result.question_id, result.option_id);
                            })
                            break;

                        case 'RESULTSURVEY':
                            parsedData.payload.forEach(result => {
                                query.addGQRSurvey(user_id, result.question_id, result.response);
                            })
                            break;


                        case "REQUESTEDITSQ":
                            query.getSQ(parsedData.sq_id).then(resp => {
                                if (resp.length !== 0) {
                                    let payload = formatSQEdit(resp, user_id, parsedData.sqtype);
                                    sendPayload(payload, wss);
                                } else {
                                    let hostpayload = {
                                        type: "DISPLAYEDITSQ",
                                        sq_id: parsedData.sq_id,
                                        host_id: user_id,
                                        sqtype: parsedData.sqtype,
                                        error: `No questions found for this ${parsedData.sqtype}`
                                    };
                                    sendPayload(hostpayload, wss);
                                }
                            })
                            break;

                        case "REQUESTGUESTS":
                            query.getGuestsForHost(user_id).then(resp => {
                                if (resp.length !== 0) {
                                    let payload = formatGuests(resp, user_id);
                                    sendPayload(payload, wss);
                                } else {
                                    let payload = {
                                        type: "DISPLAYGUESTS",
                                        host_id: user_id,
                                        error: `There are no students in your class.`
                                    };
                                    sendPayload(payload, wss);
                                }
                            })
                            break;

                        case "DELETESQ":
                            query.deleteAllGQR(parsedData.sq_id);
                            query.deleteAllOptions(parsedData.sq_id);
                            query.deleteAllQuestions(parsedData.sq_id);
                            query.deleteSQ(parsedData.sq_id);
                            query.deleteAllSQQO(parsedData.sq_id);
                            break;

                        case "DELETEGUEST":
                            query.deleteGQRForHost(parsedData.host_guest_id, user_id).then(resp => {
                                query.deleteHG(parsedData.host_guest_id);
                            })
                            break;

                        case "EDITSQ":
                            editSQ(parsedData);
                            break;

                        default:
                            break;
                    }
                });
            })
        })
    })
}

function formatGuests(resp, host_id) {
    let result = {};
    result["type"] = "DISPLAYGUESTS";
    result["host_id"] = host_id;
    result["payload"] = resp;
    result["error"] = null;
    return result;
}

function formatSQ(resp, host_id, sqtype) {
    let result = {};
    result["type"] = "DISPLAYACTIVESQ";
    result["host_id"] = host_id;
    result["sq_id"] = resp[0]["sq_id"];
    result["title"] = resp[0]["sq_name"];
    result["sqtype"] = sqtype;
    if (sqtype === 'survey') {
        result["payload"] = surveyPayload(resp);
    } else if (sqtype === 'quiz') {
        result["payload"] = quizPayload(resp, "display");
    }
    return result;
}

function formatSQEdit(resp, host_id, sqtype) {
    let result = {};
    result["type"] = "DISPLAYEDITSQ";
    result["host_id"] = host_id;
    result["sq_id"] = resp[0]["sq_id"];
    result["title"] = resp[0]["sq_name"];
    result["error"] = null;
    result["sqtype"] = sqtype;
    if (sqtype === 'survey') {
        result["payload"] = surveyPayload(resp);
    } else if (sqtype === 'quiz') {
        result["payload"] = quizPayload(resp, null);
    }
    return result;
}

function surveyPayload(resp) {
    let result = [];
    resp.forEach((question) => {
        let q_obj = {};
        q_obj.question_id = question.question_id;
        q_obj.question_number = question.question_number;
        q_obj.text = question.question;
        result.push(q_obj);
    })
    return result;
}

function quizPayload(resp, display) {
    let result = {}
    resp.forEach((question) => {
        let question_id = question.question_id;
        if (!(question_id in result)) {
            result[question_id] = {};
            result[question_id].question_id = question_id;
            result[question_id].question_number = question.question_number;
            result[question_id].text = question.question;
            result[question_id].options = [];
        }
        let option = {};
        option.option_id = question.option_id;
        option.text = question.option_text;
        if (display !== "display") {
            option.value = question.option_value;
        }
        result[question_id].options.push(option);
    })
    return result;
}

function formatSQList(resp, user_id) {
    let result = {};
    result["type"] = "DISPLAYSQLIST";
    result["host_id"] = user_id;
    result["payload"] = resp;
    result["error"] = null;
    return result;
}

// Formats payload for results of survey
function formatResults(resp, user_id, sqtype) {
    let result = {};
    result["type"] = "DISPLAYRESULTS";
    result["host_id"] = user_id;
    result["title"] = resp[0]["sq_name"];
    result["payload"] = {};
    result["sqtype"] = sqtype;
    result["error"] = null;
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
        question_obj["id"] = person.question_id;
        question_obj["response"] = person.response;
        if (person.response === null && person.option_value !== null) {
            question_obj["response"] = person.option_text;
            question_obj["value"] = person.option_value;
        } else if (person.response === null) {
            question_obj["response"] = "-";
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
        let id = option.option_id;
        if (id !== null && !("option_id" in option)) {
            query.updateOption(id, option.text, option.value);
        } else {
            query.addOption(option.text, option.value).then(resp => {
                query.addSQQuestionOption(sq_id, question_id, resp.dataValues.option_id);
            })
        }
    })
}

function addGuestToHost(parsedData, guest_id) {
    return query.addHostGuest(parsedData['host_id'], guest_id).then(resp => {
        return resp;
    }
    );
}

function editSQ(parsedData) {
    query.deleteAllGQR(parsedData.sq_id);
    if ("deleted_options" in parsedData) {
        parsedData.deleted_options.forEach(option_id => {
            query.deleteSQQOOption(option_id);
            query.deleteOption(option_id);
        })
    }
    if ("deleted_questions" in parsedData) {
        parsedData.deleted_questions.forEach(question_id => {
            query.deleteAllOptionsForQuestion(question_id);
            query.deleteSQQOQuestion(question_id);
            query.deleteQuestion(question_id);
        })
    }

    if (parsedData.payload.length !== 0) {
        parsedData.payload.forEach(question => {
            let question_id = question.question_id;
            if (question_id !== null) {
                query.updateQuestion(question_id, question.text, question.question_number);
                if (question['options'] !== undefined) {
                    addOptions(question, parsedData.sq_id, question_id);
                } else {
                    query.addSQQuestionOption(parsedData.sq_id, question_id, null);
                }
            } else {
                query.addQuestion(question.text, question.question_number).then(resp => {
                    question_id = resp.dataValues.question_id;
                    if (question['options'] !== undefined) {
                        addOptions(question, parsedData.sq_id, question_id);
                    } else {
                        query.addSQQuestionOption(parsedData.sq_id, question_id, null);
                    }
                })
            }
        })
    }
}

function sendPayload(payload, wss) {
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(payload));
    });
}

function sendHeartbeat(wss, parsedData, user_id) {
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify({
            "type": 'RECEIVEHEARTBEAT',
            "host_id": user_id
        }))
    })
}
function sendHeartbeatToHost(wss, parsedData) {
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify({
            "type": 'GUESTHEARTBEATTOHOST',
            "host_id": parsedData.host_id,
            "guest_id": parsedData.guest_id
        }))
    })
}







// function sendToWebSocket(message) {
//     socket.send(JSON.stringify(message));
// }

module.exports = {
    init
}
