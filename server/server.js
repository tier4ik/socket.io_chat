const path = require('path');
const http = require('http');
const publickPath = path.join(__dirname + '/../public/');
const socketIo = require('socket.io');

const express = require('express');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

var msgGenerator = require('./utils/msgGen').msgGenerator;
var locationGenerator = require('./utils/msgGen').locationGenerator;
var isRealString = require('./utils/validation.js').isRealString;
var Users = require('./utils/users.js').Users;

const io = socketIo(server);

var users = new Users();

app.use(express.static(publickPath));

io.on('connection', (socket)=> {
    //
    socket.on('join', (params, callback)=> {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required !');
        }
        // Метод join позволяет подписать socket на отдельный канал (комнату), доступ
        // к которому будет не у всех
       
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUsersList(params.room));
        // Чтобы выйти из комнаты socket.leave('nameOfTheRoom')
        
        // io.emit ---> io.to('nameOfTheRoom').emit
        // socket.broadcast.emit ---> socket.broadcast.to('nameOfTheRoom').emit
        // socket.emit ---> socket.to('nameOfTheRoom').emit
        
        //broadcast означает отослать событие всем, КРОМЕ ТОГО socket кто вызвал его
        socket.broadcast.to(params.room).emit('newMsg', msgGenerator('Admin', 'Welcome, '+params.name+' !'));
        socket.emit('newMsg', msgGenerator('Admin', 'Welcome in our wonderful chat !'));
        //
        callback();
    });
    //
    socket.on('createMsg', (msg, callback)=> {
        let date = new Date();
        var user = users.getUser(socket.id);
        if(user && isRealString(msg.text)) {
            //благодаря emit можем создавать любые эвенты                
            //io.emit срабатывает для ВСЕХ подключенных пользователей
            //socket.emit для одного подключения
            io.to(user.room).emit('newMsg', msgGenerator(user.name, msg.text));
            callback();
        }else{
            return false;
        }
     });

    socket.on('createLocationMsg', (coords)=> {
        var user = users.getUser(socket.id);
        if(user) {
            io.to(user.room).emit('newLocationMsg', locationGenerator(user.name, coords.latitude, coords.longitude));
        }else{
            return false;
        }
    });

    socket.on('disconnect', ()=> {
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUsersList(user.room));
            io.to(user.room).emit('newMsg', msgGenerator('Admin', `${user.name} has left`));
        }
        console.log('User is disconnected');
    });
});

server.listen(port, ()=> {
    console.log('The server is running on port ' + port);
});
