const jwt=require("jsonwebtoken");
const Gamelist=require("./UserSchema")

const Auth=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt
        
        const verifyuser=jwt.verify(token,"Hellotherethisismohitkumardora");   
        const userdetails=await Gamelist.findOne({_id:verifyuser._id,"tokens.token":token});
        if(!userdetails){
            throw new Error("User Not Found")
        }
        req.token=token;
        req.userdetails=userdetails;
        next()
    } catch (error) {
        res.status(401).send("Unauthorized token provided")
    }
}

module.exports=Auth