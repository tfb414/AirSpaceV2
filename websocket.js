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
        sessionmanager.sharedSession(req, {}, function(){
            req.session.save(function() {
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
                    // if (parsedData.type === 'CREATESURVEY') {
                    //     addSurveyAndQuestions(parsedData);
                    // }
                    
                    addQuizQuestionsAnswers(parsedData.payload);
                });

            });
        })
    })
}

function addQuizQuestionsAnswers(parsedData) {
    query.addSQ(parsedData['title'], parsedData['host_id'], 'quiz').then(resp => {
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



const createSurveyExample = {
    type: 'CREATESURVEY',
    title: "title of survey",
    host_id: "tfb414@gmail.com",
    payload: [
        {
            question_number: 1,
            text: 'Favorite Color',
        },
        {
            question_number: 2,
            text: 'favorite animal?'
        }

    ]
}

const createSurveyExample2 = {
    "type": "CREATESURVEY",
    "host_id": "tfb414@gmail.com",
    "title": "Title 1",
    "payload": [
        {
            "question_number": 1,
            "text": "Favorite Color?"
        },
        {
            "question_number": 2,
            "text": "Favorite Animal?"
        }]
}

const createQuizExample =
    {
        type: 'CREATEQUIZ',
        title: "title of Quiz",
        host_id: "tfb414@gmail.com",
        payload: [
            {
                question_number: 1,
                text: 'Favorite Color',
                option: [{
                    value: 'true',
                    text: "blue"
                },
                {
                    value: 'false',
                    text: 'green'
                },
                {
                    value: 'false',
                    text: 'purple'
                },
                ]
            },
            {
                question_number: 2,
                text: 'favorite animal?',
                option: [{
                    value: 'true',
                    text: "horse"
                },
                {
                    value: 'false',
                    text: 'cow'
                },
                {
                    value: 'false',
                    text: 'dog'
                },
                ]
            }]
    }


// function sendToWebSocket(message) {
//     socket.send(JSON.stringify(message));
// }

module.exports = {
    init
}
