var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
    //При подключении к серверу 
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            //если колбэк с ошибкой вернем пользователя на страницу логина
            window.location.href = '/';
        }else{
            console.log('no errors');
        }
    });
});

socket.on('newMsg', function(msg) {
    var formattedTime = moment(msg.createdAt).format('h:mm a');

    var templ = $('#msg__template').html();
    var html = Mustache.render(templ, {
        from: msg.from,
        text: msg.text,
        time: formattedTime
    });
    $('#chat__list').append(html);
    // var formattedTime = moment(msg.createdAt).format('h:mm a');

    // console.log('New message is ', msg);
    // var li = $('<li></li>');
    // var span = $('<span></span>');

    // span.text(formattedTime);
    // span.attr('class', 'msg__time');

    // li.text(msg.from + ': ' + msg.text);
    // li.append(span);
    // $('#chat__list').append(li);
});

socket.on('disconnect', function() {
    console.log('Disonnected from server');
});

socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>');

    users.forEach(function(user) {
        ol.append($('<li></li>').text(user));
    });
    $('#chat__users-list').html(ol);
});

$('#msg__form').on('submit', function(evt) {
    evt.preventDefault();
    var params = $.deparam(window.location.search);
    let text = $('#msg__text').val();

    if(!text) {
        return false;
    }

    socket.emit('createMsg', {
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
    var formattedTime = moment(msg.createdAt).format('h:mm a');

    var templ = $('#msgLoc__template').html();
    var html = Mustache.render(templ, {
        from: msg.from,
        time: formattedTime,
        attrVal: msg.link
    });
    $('#chat__list').append(html);
    // var li = $('<li></li>');
    // var a = $('<a></a>');
    // var span = $('<span></span>');

    // span.text(formattedTime);
    // span.attr('class', 'msg__time');

    // a.attr('href', msg.link);
    // a.text('Click to see you current location');

    // li.text(msg.from + ': ');
    // li.append(a);
    // li.append(span);
    // $('#chat__list').append(li);
});

