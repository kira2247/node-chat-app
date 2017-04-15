const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
//setup public path
const publicPath = path.join(__dirname,'../public');

//setup port for server
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();
//setup express static middleware to public folder
app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  
  //socket.emit from admin text welcome to the chat app
  //socket.broadcast.emit from admin text new user joined
  socket.on('join',(params, callback) =>{
    if(!isRealString(params.name)||!isRealString(params.room)){
      return callback('Name and room name are required.!');
    }
    //join a room
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    //socket.leave


    //io.emit-> io.to('specificroom'.emit)
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //socket.broadcast.emit to send others in specific room-> socket.broadcast.to...emit
    //socket.emit.
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    //broadcast to all connected client except for the new one connect recently
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined`));
    callback();
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

  //listen for createLocationMessage
  socket.on('createLocationMessage',(coords)=>{
    let user = users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude,coords.longitude));
    }
  });

  socket.on('createMessage', (message, callback)=>{
    let user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
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
    let user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
