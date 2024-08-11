import jwt from "jsonwebtoken";
const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    });
    res.cookie('jwt',token,{
        maxAge:15*24*60*60*1000, //milli seconds
        httpOnly:true,//prevent XSS attacks,    
        sameSite:"strict" //prevent csrf attacks    
    })
}
export default generateTokenAndSetCookie;
