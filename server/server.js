const path = require('path');
const http = require('http');
const publickPath = path.join(__dirname + '/../public/');
const socketIo = require('socket.io');

const express = require('express');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

var msgGenerator = require('./utils/msgGen').msgGenerator;

const io = socketIo(server);

app.use(express.static(publickPath));

io.on('connection', (socket)=> {
    //
    socket.broadcast.emit('newMsg', msgGenerator('Admin', 'Welcome our new user !'));
    socket.emit('newMsg', msgGenerator('Admin', 'Welcome in our wonderful chat !'));
    //
    socket.on('createMsg', (msg, callback)=> {
        let date = new Date();
        //благодаря emit можем создавать любые эвенты                
        //io.emit срабатывает для ВСЕХ подключенных пользователей
        //socket.emit для одного подключения
        io.emit('newMsg', msgGenerator(msg.from, msg.text));
        callback('This is from the server');
        //broadcast означает отослать событие всем, КРОМЕ ТОГО socket кто вызвал его
        // socket.broadcast.emit('newMsg', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: `${date.getHours()}:${date.getMinutes()}`
        // });
    });

    socket.on('disconnect', ()=> {
        console.log('User is disconnected');
    });
});

server.listen(port, ()=> {
    console.log('The server is running on port ' + port);
});
