const mongoose=require("mongoose");

const commentschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    msg:{
        type:String,
        required:true,
        
    },
    time : { type : Date, default: Date.now } 
})

const comment=new mongoose.model("Comment",commentschema);
module.exports=comment;