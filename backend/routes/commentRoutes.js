import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

// get comments
router.get("/:videoId", async (req,res)=>{
const comments = await Comment.find({videoId:req.params.videoId});
res.json(comments);
});

// add comment
router.post("/", async (req,res)=>{
const comment = new Comment(req.body);
await comment.save();
res.json(comment);
});

// update comment
router.put("/:id", async (req,res)=>{
const updated = await Comment.findByIdAndUpdate(
req.params.id,
{ text:req.body.text },
{ new:true }
);
res.json(updated);
});

// delete comment
router.delete("/:id", async (req,res)=>{
await Comment.findByIdAndDelete(req.params.id);
res.json({message:"deleted"});
});

export default router;