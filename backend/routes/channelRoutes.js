import express from "express";
import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

const router = express.Router();


// create channel
router.post("/create", async(req,res)=>{

const {name,description,owner} = req.body;

const channel = new Channel({
name,
description,
owner
});

await channel.save();

res.json(channel);

});


// get channel videos
router.get("/:channelName", async(req,res)=>{

const videos = await Video.find({
channelName:req.params.channelName
});

res.json(videos);

});

export default router;