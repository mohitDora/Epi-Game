const express = require("express");
const mongoose = require("mongoose");
const comment = require("./Commentschema");
const commentRouter = express.Router();

commentRouter.post("/commentpost", async (req, res) => {
    try {
        const newgame = new comment(req.body)
        const adddedData = await newgame.save()
        res.status(201).send(adddedData)
    } catch (error) {
        res.status(401).send(error);
        console.log(error)
    }
})
commentRouter.get("/comment", async (req, res) => {
    try {
        console.log(req.query)
        const limit=req.query.limit*1||1000;
        const getdata = await comment.find({}).sort({time:-1}).limit(limit)
       
        res.status(201).send(getdata)
    } catch (error) {
        res.status(401).send(error)
    }
}) 
// comment.deleteMany({  }).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

module.exports = commentRouter