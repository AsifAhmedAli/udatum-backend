const router = require("./routes/routes");
const express = require("express");
const crypto = require('crypto');
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
const port = 3000;

// app.use(conn);
io.on("connection",(socket)=>{
  console.log("new connection established")
  
  socket.on("set_new_message", (messageData) => {
    const { senderId, receiverId, message, senderName, receiverName } = messageData;
  })

  socket.on("disconnect",()=>{
    console.log("user disconnected")
  })
})

app.use("/", router);
server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
