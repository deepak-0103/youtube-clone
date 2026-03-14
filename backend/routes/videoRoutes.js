import express from "express";
import Video from "../models/Video.js";

const router = express.Router();

router.get("/channel/:name", async (req,res)=>{

try{

const videos = await Video.find({
channelName:req.params.name
});

res.json(videos);

}catch(err){

res.status(500).json({message:"Error fetching channel videos"});

}

});

router.get("/", async(req,res)=>{
 const {category} = req.query;

 if(category){
  const videos = await Video.find({category});
  return res.json(videos);
 }

 const videos = await Video.find();
 res.json(videos);
});

router.get("/:id", async(req,res)=>{
 const video = await Video.findById(req.params.id);
 res.json(video);
});

router.post("/", async(req,res)=>{
 const video = new Video(req.body);
 await video.save();
 res.json(video);
});

router.put("/:id", async(req,res)=>{
 const video = await Video.findByIdAndUpdate(req.params.id,req.body,{new:true});
 res.json(video);
});

router.delete("/:id", async(req,res)=>{
 await Video.findByIdAndDelete(req.params.id);
 res.json({message:"Video deleted"});
});

export default router;

