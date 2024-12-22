const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRoutes = require("./Routes/authRoutes.js")
const messageRoutes = require("./Routes/messageRoutes.js")
const userRoutes = require("./Routes/userRoutes.js")
const { app, server } = require("./Sockets/Socket.js");
 

const PORT = 5000
const MONGO_URL = "mongodb+srv://aditya:aditya@react-express-mongodb.sxonfox.mongodb.net/?retryWrites=true&w=majority&appName=React-Express-MongoDB"
const connectMongoose = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error Connecting DB")
    }
}

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

// app.use(express.static(path.join(__dirname, "/frontend/dist")))
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
// })

server.listen(PORT, () => {
    connectMongoose()
    console.log(`Server Running on ${PORT}`)
})
