import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
export const SignUp=async(req,res)=>{
    // res.send("hello")
    try {
      const {fullName,username,password,confirmPassword}=req.body;
      if(password!==confirmPassword){
        return res.status(400).json({error:"passwords do not match"});
      } 
      const user=await User.findOne({username});
      if(user){
        return res.status(400).json({error:"user already exists"});
      }
      const salt=await bcrypt.genSalt(10);
      const hashPassword= await bcrypt.hash(password,salt);
      const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
    //   const GirlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`
      const newUser=new User({
        fullName
        ,username,
        password:hashPassword,
        profilePic:boyProfilePic
      })
     if(newUser){
      generateTokenAndSetCookie(newUser._id,res);
      await newUser.save();
      res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        username:newUser.username,
        profilePic:newUser.profilePic,
      })
     }
     else{
      res.status(400).json({error:"INVALID USER DATA"})
     }
    } catch (error) {
        console.log("error in signup controller",error.message)
            res.status(500).json({error:"internal server error"})
    }
}
export const login=async(req,res)=>{
try {
const {username,password}=req.body;
const user=await User.findOne({username});
const isPasswordCorrect=await bcrypt.compare(password,user?.password||"");
if(!user || !isPasswordCorrect){
  return res.status(400).json({error:"INVALID USERNAME OR PASSWORD !!!"})
}  
generateTokenAndSetCookie(user._id,res);
res.status(200).json({
  _id:user._id,
  fullName: user.fullName,
  username: user.username,
})
} catch (error) {
  console.log("error in login controller")
  res.status(500).json({error:"internal server error"})
}
}
export const logout=(req,res)=>{
  try {
    res.cookie('jwt','',{maxAge:0});
    res.status(200).json({message:"logged out successfully"})
  } catch (error) {
    console.log("error in logout controller")
    res.status(500).json({error:"internal server error"})
  }
}
