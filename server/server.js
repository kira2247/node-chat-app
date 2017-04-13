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
  socket.on('disconnect', ()=>{
    console.log('User was disconnected from server');
  });
});

server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
