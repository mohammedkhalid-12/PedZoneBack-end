


//stablish  server
const express = require('express');
const app = express();
const port = process.env.Port||3000;
const server = app.listen(port,()=>{
    console.log('server is running on ',port);
});


//socket io
const io = require('socket.io')(server);
const connectedUser = new Set();
io.on('connection',(socket)=>{
    
    console.log("connected successfully ",socket.id);
    connectedUser.add(socket.id);
    io.emit('connecte-user',connectedUser.size);

    socket.on("disconnect",()=>{
        console.log("disconnected ",socket.id);
        connectedUser.delete(socket.id);
        io.emit('connecte-user',connectedUser.size);

    });
    socket.on('message',(data)=>{
        console.log(data);
       socket.broadcast.emit('message-receive',data);
    });


});