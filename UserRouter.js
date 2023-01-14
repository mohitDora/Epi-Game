const express = require("express");
const mongoose = require("mongoose");
const User = require("./UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth=require("./Auth");
var cookieParser = require('cookie-parser')

const userRouter = express.Router();
userRouter.use(cookieParser())
// const db = "mongodb://localhost:27017/API";
// const db="mongodb+srv://Mohitdora21:Mohit@123@cluster0.zlx4lw2.mongodb.net/?retryWrites=true&w=majority"
// mongoose.connect(db, {
//     useNewUrlParser: true,

// }).then(() => {
//     console.log("User Database Successfully Connected")
// }).catch((err) => {
//     console.log("Failed to connect to the database")
// })

userRouter.post("/signup", async (req, res) => {
    const { username, email, pwd } = req.body;
    
    try {
        const isPresent = await User.findOne({ email });
        // const isPresent2 = await User.findOne({ username });
        if (isPresent) {
            return res.status(422).json({ error: "Already Present" });
        }
        const user = new User(req.body);
        const token = await user.genToken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 86400000),
            httpOnly: true
        });
        await user.save();
        res.status(201).json("Game added successfully");
    } catch (error) {
        res.status(422).send([])
    }
})

userRouter.post("/signin", async (req, res) => {
    try {
        const { pwd, ...username } = req.body;
        const isPresent = await User.findOne(username);
        let ismatch;
        if (isPresent) {
            ismatch = await bcrypt.compare(pwd, isPresent.pwd);
            const token = await isPresent.genToken();
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 86400000),
                httpOnly: true
            });
        }
        if (ismatch && isPresent) {
            res.status(201).json("Successfully Signed in")
        }
        else {
            res.status(422).json("Incorrect credentials")
        }
    } catch (error) {
        res.status(422).send([]);
        console.log(error)
    }
})
userRouter.get("/validate",Auth,(req,res)=>{
    res.json(req.userdetails)
})

userRouter.get("/logout",Auth,async (req,res)=>{
    try {
        req.userdetails.tokens=req.userdetails.tokens.filter((game)=>{
            return game.token!==req.token;
        })
        res.clearCookie("jwt");
        console.log("logout")
        await req.userdetails.save();
        res.json("logout")
        res.end()
    } catch (error) {
        res.status(500).send([])
    }
})


module.exports = userRouter