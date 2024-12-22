const express = require("express");
const Message = require("../Models/message.js");
const Conversation = require("../Models/conversation.js");
const router = express.Router()
const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");
const { getRecieverSocketId, io } = require("../Sockets/Socket.js");

router.post("/send/:id", async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) return res.status(401).json({error: "Not Authorized: Token Not Provided"})
        const decoded = jwt.verify(token, "SPIDERTASK"); 
        if (!decoded) return res.status(401).json({error: "Not Authorized: Token not Correct"})
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) return res.status(404).json({error: "User Not Found"})
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
        console.log("Error in Code: ", error)
    }
}, async (req, res) => {
     try {
        const {message} = req.body
        const {id:recieverId} = req.params
        const senderId = req.user._id
        let conversation = await Conversation.findOne({participants: {$all: [senderId, recieverId]}})
        if (!conversation) conversation = await Conversation.create({participants:[senderId, recieverId]})
        const newMessage = await Message.create({senderId, recieverId, message})
        if (newMessage) conversation.messages.push(newMessage._id)
        await conversation.save()

        const recieverSocketId = getRecieverSocketId(recieverId)
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
     } catch (error) {
         res.status(500).json({error: "Internal Server Error"})
         console.log("Error in Code", error)
     }
})

router.get("/:id", async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) return res.status(401).json({error: "Not Authorized: Token Not Provided"})
        const decoded = jwt.verify(token, "SPIDERTASK"); 
        if (!decoded) return res.status(401).json({error: "Not Authorized: Token not Correct"})
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) return res.status(404).json({error: "User Not Found"})
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
        console.log("Error in Code: ", error)
    }
}, async (req, res) => {
     try {
        const {id:userToChatId} = req.params
        const senderId = req.user._id
        const converation = await Conversation.findOne({participants: {$all: [senderId, userToChatId]}}).populate("messages")
        if (!converation) return res.status(404).json([])
        res.status(200).json(converation.messages)
     } catch (error) {
         res.status(500).json({error: "Internal Server Error"})
         console.log("Error in Code", error)
     }
})

module.exports = router