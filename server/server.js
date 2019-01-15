const path = require('path');
const http = require('http');
const publickPath = path.join(__dirname + '/../public/');
const socketIo = require('socket.io');

const express = require('express');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const io = socketIo(server);

app.use(express.static(publickPath));

io.on('connection', (socket)=> {
    //
    socket.broadcast.emit('newMsg', {
        from: 'Admin',
        text: 'Welcome our new user !'
    });
    socket.emit('newMsg', {
        from: 'Admin',
        text: 'Welcome in our wonderful chat !'
    });
    //
    socket.on('createMsg', (msg)=> {
        let date = new Date();
        //благодаря emit можем создавать любые эвенты                
        //io.emit срабатывает для ВСЕХ подключенных пользователей
        //socket.emit для одного подключения
        io.emit('newMsg', {
            from: msg.from,
            text: msg.text,
            createdAt: `${date.getHours()} : ${date.getMinutes()}`
        });

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
