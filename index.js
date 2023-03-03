const router = require("./routes/routes");
const express = require("express");
const crypto = require('crypto');
const cors = require('cors');
const { Router } = require("express");
const cookieParser = require('cookie-parser');
const socketio = require('socket.io')
const http = require('http')


// const conn = require("./conn/conn");
require("dotenv").config();






const app = express();
const server = http.createServer(app)
io = socketio(server)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin:"*",
  credentials: true,
}));






const port = 3000;

// app.use(conn);
io.on("connection",(socket)=>{
  console.log("new connection established")
 // Join a room
 socket.on('joinRoom', (room) => {
  socket.join(room);
  console.log(room)
});
  
  socket.on('new message', (message) => {
    io.emit('new message',message);
    console.log(message)
  });
 
  socket.on('update message', (message) => {
    io.emit('update message', message);
  });

  socket.on("disconnect",()=>{
    console.log("user disconnected")
  })
 
})



app.use("/", router);
server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
