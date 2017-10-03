const WebSocket = require('ws');
const query = require('./queries');

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

    wss.on('connection', function connection(ws) {
        wss.clients.forEach(function each(client) {
            // if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send("you're a wizard harry!")
            // client.send(data);

            // }
        });

        ws.on('message', function incoming(data) {
            // let parsedData = createQuizExample;
            let parsedData = JSON.parse(data);
            // let parsedData = createSurveyExample;
            // console.log('inc Data')
            // Broadcast to everyone else.
            // sendToWebSocket("hey!")
            // console.log(JSON.parse(data));
            // if (parsedData.type === 'CREATESURVEY') {
            //     addSurveyAndQuestions(parsedData);
            // }
            console.log(parsedData)
            addQuizQuestionsAnswers(parsedData);



        });
    });
}

function addQuizQuestionsAnswers(parsedData) {
    query.addSQ(parsedData['title'], parsedData['host_id']);
    addQuestionsAndAnswers(parsedData.payload);
}


function addQuestionsAndAnswers(parsedData) {
    parsedData.forEach((question) => {
        query.addQuestion(question['text'], question['question_number']);
        if (question['option'] !== undefined) {
            addOptions(question, parsedData);
        }
    })
}

function addOptions(question, parsedData) {
    question.option.forEach((option) => {
        query.addOption(option.text, option.value)
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
