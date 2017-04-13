const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//setup public path
const publicPath = path.join(__dirname,'../public');

//setup port for server
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
//setup express static middleware to public folder
app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  //server emit newEmail event to client
  // socket.emit('newEmail', {
  //     from:'mike@example.com',
  //     text:'Hey.what is going on',
  //     createAt: 321
  // });
  socket.emit('newMessage', {
    from:'Server',
    text:'Im there',
    createAt: 123
  });
  //server listener for createEmail event Emit(socket.emit)-> listen(socket.on)
  // socket.on('createEmail', (newEmail)=>{
  //   console.log('CreateEmail', newEmail);
  // });

  socket.on('createMessage', (message)=>{
    console.log('CreateMessage', message);
  })

  socket.on('disconnect', ()=>{
    console.log('User was disconnected from server');
  });
});

server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
