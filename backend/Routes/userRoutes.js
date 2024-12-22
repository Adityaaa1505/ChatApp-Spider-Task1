const express = require("express");
const router = express.Router()
const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");

router.get("/", async (req, res, next) => {
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
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
     } catch (error) {
         res.status(500).json({error: "Internal Server Error"})
         console.log("Error in Code", error)
     }
})

module.exports = router