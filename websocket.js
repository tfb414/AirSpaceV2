const WebSocket = require('ws');

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

        console.log('IT IS ALIIIVE')
        ws.on('message', function incoming(data) {
            console.log('derp back to you')
            // Broadcast to everyone else.
            // sendToWebSocket("hey!")
            console.log(data);



        });
    });
}





// function sendToWebSocket(message) {
//     socket.send(JSON.stringify(message));
// }

module.exports = {
    init
}
