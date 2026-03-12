import express from "express";
import Comment from "../models/Comment.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:videoId", async(req,res)=>{
 const comments = await Comment.find({videoId:req.params.videoId});
 res.json(comments);
});

router.post("/:videoId",verifyToken, async(req,res)=>{
 const comment = new Comment({
   videoId:req.params.videoId,
   userId:req.user.id,
   text:req.body.text,
   timestamp:new Date()
 });

 await comment.save();

 res.json(comment);
});

export default router;