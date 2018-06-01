var app  = require('express')();

var http = require('http').Server(app);
var io   = require('socket.io')(http);

app.get('/', function (req, res) {

    //send the index.html file for all requests
    res.sendFile(__dirname + '/index.html');
});

var users = [];
var user = {};




io.on('connection', (socket) => {

    socket.on('identify', (user) => {

        socket.userid   = user.id;
        socket.username = user.username; 

        console.log('USER ' + user.username + ' just connected!');
        console.log('AND HIS SOCKET ID IS: ' + socket.id);
        socket.broadcast.emit('message', user.username + ' just connected!');
        socket.join('U:'+socket.userid);

    });


    socket.on('message', (message) => {
        console.log(message);
    })





})


http.listen(3000, function() {
    console.log('listening on *:3000');
})