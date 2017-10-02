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
            let parsedData = derp;
            // let parsedData = JSON.parse(data);
            // console.log('inc Data')
            // Broadcast to everyone else.
            // sendToWebSocket("hey!")
            // console.log(JSON.parse(data));
            // if (parsedData.type === 'CREATESURVEY') {

            query.addSQ(parsedData.title, parsedData.host_id);
            addQuestion(parsedData.payload);
            // }


        });
    });
}

function addQuestion(parsedData) {
    parsedData.forEach((question) => {
        console.log(question);
        query.addQuestion(question.text, question.question_number);
    })
}

const derp = {
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



// function sendToWebSocket(message) {
//     socket.send(JSON.stringify(message));
// }

module.exports = {
    init
}
