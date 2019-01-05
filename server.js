//server

let express = require('express');
let app = express(); // create app from express framework
let server = require('http').createServer(app); // create server of type http running app
let io = require('socket.io').listen(server); // create a socket on the server that listens to the server
let users = [];
let connections = [];
let rooms = [];

server.listen(process.env.PORT || 4000); // where server is 

console.log('server running ...');

app.use(express.static('public'));

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    // DISCONNECTION
    socket.on('disconnect', (data) => { // when this specific socket disconnects
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    // SEND MESSAGE
    socket.on('sendMessage', (message, user) => {
        io.sockets.emit('newMessage', { msg: message, usr: user });
    });

    //ADD USERS
    socket.on('userGiven', (data) => {
        console.log("got here");
        if (users.indexOf(data, 0) === -1 && data != "") {
            users.push(data);
            io.sockets.emit('newUser', users);
            socket.emit('goodUser');
        }else {
            socket.emit('badUser');
        }
    });
});