var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
    socket.emit('createMsg', {
        from: 'Max',
        text: 'Simply text from message'
    });
});

socket.on('newMsg', function(msg) {
    console.log('New message is ', msg);
});

socket.on('disconnect', function() {
    console.log('Disonnected from server');
});

