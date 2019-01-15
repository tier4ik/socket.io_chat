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
    console.log('New user connected');
    //благодаря emit можем создавать любые эвенты


    socket.on('createMsg', (msg)=> {
        console.log(msg);
        let date = new Date();
        msg.createdAt = `${date.getHours()} : ${date.getMinutes()}`;
                         
        
        socket.emit('newMsg', msg);
    });

    socket.on('disconnect', ()=> {
        console.log('User is disconnected');
    });
});

server.listen(port, ()=> {
    console.log('The server is running on port ' + port);
});
