let socket = io();


function scrollToBottom() {
	// Selectors
	const messages = $('#messages');
	let newMessage = messages.children('li:last-child');
	// Heights
	let clientHeight = messages.prop('clientHeight');
	let scrollTop = messages.prop('scrollTop');
	let scrollHeight = messages.prop('scrollHeight');
	let newMessageHeight = newMessage.innerHeight();
	let lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}



socket.on('connect', function() {
	console.log('Connected to server!');
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});


socket.on('newMessage', function(message){
	let formattedTime = moment(message.createdAt).format('h:mm a');
	const template = $('#message-template').html();
	let html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	$('#messages').append(html);
	scrollToBottom();
});


socket.on('newLocationMessage', (message) => {
	let formattedTime = moment(message.createdAt).format('h:mm a');
	const template = $('#location-message-template').html();
	let html = Mustache.render(template, {
		from: message.from,
		createdAt: formattedTime,
		url: message.url
	});

	$('#messages').append(html);
	scrollToBottom();
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