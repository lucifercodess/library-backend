import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { genToken } from "../token/jwt.js";
export const register = async(req,res)=>{
  const {name,email,password,role} = req.body;
  try {
    if(!name || !email || !password){
      return res.status(400).json({code:0,message:"please fill all the fields"})
    }
    const isExist = await User.findOne({email:email});
    if(isExist){
      return res.status(200).json({code:0,message:"this email already exists"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role
    })
    await newUser.save();
    genToken(newUser._id,newUser.role,res);
    return res.status(201).json({code:1,message:"user registered"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({code:0,message:'server error'})
  }
}
export const login = async(req,res)=>{
  const {email,password } = req.body;
  try {
    if(!email || !password){
      return res.status(400).json({code:0,message:"please fill all the fields"})
    } 
    const checkUser = await User.findOne({email:email});
    if(!checkUser){
      return res.status(401).json({code:0,message:"email or password is incorrect"})
    }
    const match = await bcrypt.compare(password,checkUser.password);
    if(!match){
      return res.status(401).json({code:0,message:"email or password is incorrect"})
    }
    if(checkUser){

      genToken(checkUser._id,checkUser.role,res);
    }
    return res.status(200).json({code:1,message:"user logged in"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({code:0,message:'server error'})
  }
}

export const logout = async(req,res)=>{
  res.clearCookie('UserToken', { path: '/' });
  res.clearCookie('AdminToken', { path: '/' });
  return res.status(200).json({code:1,message:"user logged out"})
}