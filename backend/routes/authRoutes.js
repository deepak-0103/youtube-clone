import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const SECRET = "youtubeclonejwt";

// REGISTER
router.post("/register", async (req,res)=>{

try{

const {username,email,password} = req.body;

const hashedPassword = await bcrypt.hash(password,10);

const user = new User({
username,
email,
password:hashedPassword
});

await user.save();

res.json({message:"User registered"});

}catch(err){

res.status(400).json({message:"User already exists"});

}

});

// LOGIN
router.post("/login", async (req,res)=>{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
return res.status(404).json({message:"User not found"});
}

const valid = await bcrypt.compare(password,user.password);

if(!valid){
return res.status(401).json({message:"Invalid password"});
}

const token = jwt.sign(
{ id:user._id, username:user.username },
SECRET,
{ expiresIn:"1d" }
);

res.json({
token,
username:user.username
});

});

export default router;