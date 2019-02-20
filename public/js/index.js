let socket = io();

socket.on('connect', function() {
	console.log('Connected to server!');
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});


socket.on('newMessage', function(message){
	console.log('newMessage', message);
	let li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);


	$('#messages').append(li);
});


socket.on('newLocationMessage', (message) => {
	let li = $('<li></li>');
	let a = $('<a target="_blank">My current location</a>');


	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
	$('#messages').append(li);
});


$('#message-form').on('submit', (e) => {
	e.preventDefault();


	const messageTextbox = $('[name=message]');

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, () => {
		messageTextbox.val('');
	});
});


let locationButton = $('#send-location');
locationButton.on('click', () => {
	if(!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	};


	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition((position)=> {
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, () => {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	})
})