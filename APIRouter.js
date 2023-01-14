const express = require("express");
const mongoose = require("mongoose");
const gamelist = require("./Schema")

const router = express.Router();

// const db = "mongodb://localhost:27017/API";
// const db="mongodb+srv://Mohitdora21:Mohit@123@cluster0.zlx4lw2.mongodb.net/?retryWrites=true&w=majority"
// mongoose.connect(db,{
//     useNewUrlParser: true,
   
// }).then(() => {
//     console.log("API Database Successfully Connected")
// }).catch((err) => {
//     console.log("Failed to connect to the database")
// })

router.post("/api/v1/", async (req, res) => {
    try {
        const newgame = new gamelist(req.body)
        const adddedData = await newgame.save()
        res.status(201).send(adddedData)
    } catch (error) {
        res.status(401).send([]);
        console.log(error)
    }
})

//get all document
router.get("/api/v1/", async (req, res) => {
    try {
        const getdata = await gamelist.find(req.query)
       
        res.status(201).send(getdata)
    } catch (error) {
        res.status(401).send([])
    }
})    
router.get("/api/v1/name", async (req, res) => {
    try {
        const getdata = await gamelist.find(req.query,{name:1,_id:1})
        const alllower=getdata.map(((item)=>{
            return item
        }))
        console.log(alllower)
        res.status(201).send(getdata)
    } catch (error) {
        res.status(401).send([])
    }
})
//get sorted document
router.get("/api/v1/filter", async (req, res) => {
    try {
        const queryobj = { ...req.query }
       
        const exc = ["page", "sort", "limit", "fields"]
        exc.forEach((el) => delete queryobj[el])
        let querystr = JSON.stringify(queryobj);
       
        querystr = querystr.replace(/\b(gt|lt|eq|gte|lte)\b/g, match => `$${match}`)    
     
   
        let page=req.query.page*1||1;
       
        const limit=req.query.limit*1||12;
        
        let countdata = await gamelist.find(JSON.parse(querystr)).count()

        let pagelast=countdata%limit===0?Math.floor(countdata/limit):Math.floor(countdata/limit)+1;
        if(page>pagelast){
            page=pagelast;
        }
        
        const skip=Math.abs((page-1))*limit;
        const getdata = await gamelist.find(JSON.parse(querystr)).skip(skip).limit(limit)
       
        if (getdata.length) {
            
            res.status(201).send([getdata,pagelast])
        }
        else {
            res.status(201).send([])
        }
    } catch (error) {
        console.log(error)
        res.status(401).send([])
    }
})

router.get("/api/v1/search", async (req, res) => {
    try {
        const queryobj = { ...req.query }
       
        const exc = ["page", "sort", "limit", "fields"]
        exc.forEach((el) => delete queryobj[el])
        let querystr = JSON.stringify(queryobj);
     
        const getdata = await gamelist.find(JSON.parse(querystr))
        if (getdata.length) {
            res.status(201).send(getdata)
        }
        else {
            res.status(201).send([])
        }
    } catch (error) {
        console.log(error)
        res.status(401).send([])
    }
})


//get document by id
router.get("/api/v1/:id", async (req, res) => {
    try {
        const _id = req.params.id
        console.log(_id)
        const getdata = await gamelist.findById({ _id })
        res.status(201).send(getdata)
    } catch (error) {
        res.status(401).send([])
    }
})

//update document
router.patch("/api/v1/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const getdata = await gamelist.findByIdAndUpdate({ _id }, req.body)
        res.status(201).send(getdata)
    } catch (error) {
        res.status(401).send([])
    }
})

//delete document
router.delete("/api/v1/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const getdata = await gamelist.findByIdAndDelete({ _id })
        res.status(201).send(getdata)
    } catch (error) {
        res.status(401).send([])
    }
})

module.exports = router