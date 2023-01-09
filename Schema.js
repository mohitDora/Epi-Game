const mongoose=require("mongoose");

const gamesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:100,
        unique:true
    },
    price:{
        type:Number,
        required:true,
        validate(val){
            if(val<0){
                throw new Error("Price Cannot be Negative");
            }
        }
    },
    genres:{
        type:[],
        required:true,
        validate(val){
            for(let i in val){
                if(typeof val[i] !=='string' || val[i].length===0){
                    throw new Error("Genre must be String or Non-empty")
                }
            }
        }
    },
    img:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        validate(val){
            if(val<0){
                throw new Error("Rating Cannot be Negative");
            }
        }
    },
    platform:{
        type:[String],
        required:true,
        validate(val){
            for(let i in val){
                if(typeof val[i] !=="string" || val[i].length===0){
                    throw new Error("platform must be String or Non-empty")
                }
            }
        }
    },
    developer:{
        type:String,
        required:true,
    },
    publisher:{
        type:String,
        required:true,
    },
    bodytext:{
        type:String,
        required:true,
    },
    ispopular:{
        type:Boolean,
        required:true,
    },
    isfree:{
        type:Boolean,
        required:true,
    },
    isnew:{
        type:Boolean,
        required:true,
    }
})

const GameList=new mongoose.model("Gamelist",gamesSchema);
module.exports=GameList;