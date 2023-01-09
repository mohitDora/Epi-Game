const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pwd: {
        type: String,
        required: true,   
    }, 
    cpwd: {
        type: String,
        
    },
    cart:{
        type:[String]
    },
    wishlist:{
        type:[String]
    },
    library:{
        type:[String]
    },
    pic:{
        type:String
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]

})

userSchema.methods.genToken=async function(){
    try {
    
        const token=await jwt.sign({_id:this._id.toString()},"Hellotherethisismohitkumardora");
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token
    } catch (error) {
        console.log(error)
    }
}

userSchema.pre("save",async function (next){
    if(this.isModified("pwd")){
        this.pwd=await bcrypt.hash(this.pwd,12);
    }
    next();
})

const User = new mongoose.model("User", userSchema);
module.exports = User;