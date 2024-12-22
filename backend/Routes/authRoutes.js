const express = require("express");
const bcrypt = require("bcrypt")
const User = require("../Models/user");
const {generateToken} = require("../utils/generateJWT.js");
const router = express.Router()

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password||"")
        if (!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid Credentials"})
        }
        generateToken(user._id, res)
        res.status(200).json({_id: user._id, fullname: user.fullName, username: user.username, password: user.password, profilePic: user.profilePic})
    } catch (error) {
        console.error("Error in Code:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.post("/signup", async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body
        const user = await User.findOne({username})
        if (user) return res.status(400).json({error: "Username already exists"})
        if (password != confirmPassword) return res.status(400).json({error: "Passwords don't match"})
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const profilePic = `https://ui-avatars.com/api/?name=${fullName}`

        let newUser = {fullName, username, password: hashedPassword, gender, profilePic}
        if (newUser){
            newUser = await  User.create(newUser)
            generateToken(newUser._id, res)
            res.status(201).json({_id: newUser._id, fullname: newUser.fullName, username: newUser.username, profilePic: newUser.profilePic})
        }
    }
    catch (error) {
        console.error("Error in Code:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.post("/logout", async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message:"Logged Out Successfully"})
    } catch (error) {
        console.error("Error in Code:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

module.exports = router

