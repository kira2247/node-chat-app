let socket = io();

socket.on('connect', function (){
  console.log('Connected to server');
  })
});

socket.on('disconnect', function (){
  console.log('Disconnected from server');
});

socket.on('newMessage', function(mess){
  console.log('New message', mess);
});
// socket.on('newEmail', function(email){
//   console.log('New email', email);
// });
