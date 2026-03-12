import express from "express";
import Video from "../models/Video.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async(req,res)=>{
 const videos = await Video.find();
 res.json(videos);
});

router.post("/",verifyToken, async(req,res)=>{
 const video = new Video(req.body);
 await video.save();
 res.json(video);
});

router.delete("/:id",verifyToken, async(req,res)=>{
 await Video.findByIdAndDelete(req.params.id);
 res.json({message:"Video deleted"});
});

export default router;