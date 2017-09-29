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
            let parsedData = JSON.parse(data);
            console.log('inc Data')
            // Broadcast to everyone else.
            // sendToWebSocket("hey!")
            console.log(JSON.parse(data));
            if (parsedData.type === 'CREATESURVEY') {
                console.log('we here')
                query.addSQ(parsedData.payload.title, parsedData.payload.host_id)
            }


        });
    });
}





// function sendToWebSocket(message) {
//     socket.send(JSON.stringify(message));
// }

module.exports = {
    init
}
