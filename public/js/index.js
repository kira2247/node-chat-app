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
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function (){

  })
});
