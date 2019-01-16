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
    $('#chat__list').append(li);
});

socket.on('disconnect', function() {
    console.log('Disonnected from server');
});

$('#msg__form').on('submit', function(evt) {
    evt.preventDefault();

    let text = $('#msg__text').val();

    if(!text) {
        return false;
    }

    socket.emit('createMsg', {
        from: 'User',
        text: text
    }, function() {
        $('#msg__text').val('');
    });
});

var locBtn = $('#send-location');
locBtn.on('click', function(evt) {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            socket.emit('createLocationMsg', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },null, {enableHighAccuracy: true});
        }, function(err) {
            alert('Unable to fetch location');
        });
    }else{
        return alert('Your browser does not support geolocation');
    }
});

socket.on('newLocationMsg', function(msg) {
    var li = $('<li></li>');
    var a = $('<a></a>');

    a.attr('href', msg.link);
    a.text('Click to see you current location');

    li.text(`${msg.from}: `);
    li.append(a);
    $('#chat__list').append(li);
});

