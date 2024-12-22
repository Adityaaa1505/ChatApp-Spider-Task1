const jwt = require("jsonwebtoken");
const JWT_SECRET = "SPIDERTASK"

exports.generateToken = (userId, res) => {
    const token = jwt.sign({userId}, JWT_SECRET, {expiresIn:"1h"})
    res.cookie("jwt", token, {httpOnly:true, sameSite:"strict", secure:false})
}

