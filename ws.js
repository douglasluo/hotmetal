var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ port: 3000 });
let wsclient;

wss.on("connection", function(ws) {
    console.log("Connected to client");
    wsclient = ws;
    ws.on("message", function(message) {
        var obj = JSON.parse(message);
        if (obj.func === 'setStep') {
            console.log(obj);
            try {
                client.write(JSON.stringify(obj));
            } catch (error) {
                console.log(error);
            }
        }
        //ws.send(message);
    });

    ws.send("Welcome to Hot Metal");
});

const net = require('net');
const port = 3100;
const host = '127.0.0.1';

const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

var client;

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    client = sock;

    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);

        try {
            var obj = JSON.parse(data);
            console.log(obj);
            if (obj.func == 'gradeSAI' || obj.func == 'reset') {
                wsclient.send(JSON.stringify(obj));
            }
        } catch (error) {
            console.log(error);
        }
    });

    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort + ' ' + data);
    });
});