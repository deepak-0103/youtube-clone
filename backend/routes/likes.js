import express from "express";
import Video from "../models/Video.js";

const router = express.Router();

router.put("/like/:id", async(req,res)=>{

const video = await Video.findById(req.params.id);
video.likes += 1;

await video.save();

res.json(video);

});

router.put("/dislike/:id", async(req,res)=>{

const video = await Video.findById(req.params.id);
video.dislikes += 1;

await video.save();

res.json(video);

});

export default router;