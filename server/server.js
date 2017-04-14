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
  //socket.emit from admin text welcome to the chat app
  //socket.broadcast.emit from admin text new user joined

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app'
  });

  //broadcast to all connected client except for the new one connect recently
  socket.broadcast.emit('newMessage',{
    from:'Admin',
    text:'New user joined',
    createdAt: new Date().getTime()
  })

  //server emit newEmail event to client
  // socket.emit('newEmail', {
  //     from:'mike@example.com',
  //     text:'Hey.what is going on',
  //     createAt: 321
  // });
  // socket.emit('newMessage', {
  //   from:'Server',
  //   text:'Im there',
  //   createAt: 123
  // });
  //server listener for createEmail event Emit(socket.emit)-> listen(socket.on)
  // socket.on('createEmail', (newEmail)=>{
  //   console.log('CreateEmail', newEmail);
  // });

  socket.on('createMessage', (message)=>{
    console.log('CreateMessage', message);


    // io.emit('newMessage',
    // });


    //send to everybody but not the sender
    // socket.broadcast.emit('newMessage',{
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', ()=>{
    console.log('User was disconnected from server');
  });
});

server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
