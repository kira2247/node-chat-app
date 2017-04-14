let socket = io();

socket.on('connect', function (){
  console.log('Connected to server');
});


socket.on('disconnect', function (){
  console.log('Disconnected from server');
});

socket.on('newMessage', function(mess){
  console.log('New message', mess);
  var li = jQuery('<li></li>');
  li.text(`${mess.from}: ${mess.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(mess){
  let li = jQuery(`<li></li>`);
  let a = jQuery(`<a target="_blank">My Current Location</a>`);

  li.text(`${mess.from}: `);
  a.attr('href', mess.url);
  li.append(a);
  jQuery('#messages').append(li);
});
// socket.on('newEmail', function(email){
//   console.log('New email', email);
// });
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function(data){
//   console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function (e){
  e.preventDefault();
  let messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('');
  });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser!');
  }
  locationButton.attr('disable', 'disable').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
});
