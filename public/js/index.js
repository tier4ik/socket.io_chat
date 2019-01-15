var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
    // socket.emit('createMsg', {
    //     from: 'Max',
    //     text: 'Simply text from message'
    // });
});

socket.on('newMsg', function(msg) {
    console.log('New message is ', msg);
    var li = $('<li></li>');
    li.text(msg.from + ': ' + msg.text);
    $('#msg__list').append(li);
});

socket.on('disconnect', function() {
    console.log('Disonnected from server');
});

$('#msg__form').on('submit', function(evt) {
    evt.preventDefault();

    socket.emit('createMsg', {
        from: 'User',
        text: $('#msg__text').val()
    }, function() {

    });
    $('#msg__text').val('');
});

