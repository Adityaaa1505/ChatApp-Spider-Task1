const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin:["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
})

const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId]
}

const userSocketMap = {}

io.on('connection', (socket) => {
    // console.log("User Connected", socket.id)
    const userId = socket.handshake.query.userId
    if (userId != "undefined") userSocketMap[userId] = socket.id;
    
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    
    socket.on('disconnect', ()=> {
        // console.log("User Disconnected", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap)) 
    })

})


module.exports = { app, io, server, getRecieverSocketId };