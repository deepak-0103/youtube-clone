import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req,res)=>{

 const {username,email,password} = req.body;

 const hashedPassword = await bcrypt.hash(password,10);

 const user = new User({
   username,
   email,
   password:hashedPassword
 });

 await user.save();

 res.json({message:"User Registered"});
});

router.post("/login", async(req,res)=>{

 const user = await User.findOne({email:req.body.email});

 if(!user){
  return res.status(404).json("User not found");
 }

 const valid = await bcrypt.compare(req.body.password,user.password);

 if(!valid){
  return res.status(400).json("Invalid password");
 }

 const token = jwt.sign({id:user._id},"SECRET_KEY");

 res.json({token,user});
});

export default router;