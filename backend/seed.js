import mongoose from "mongoose";
import Video from "./models/Video.js";

mongoose.connect("mongodb://localhost:27017/youtubeclone");

await Video.insertMany([
{
 videoId:"video01",
 title:"Learn React in 30 Minutes",
 thumbnailUrl:"https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
 videoUrl:"https://www.youtube.com/embed/w7ejDZ8SWv8",
 description:"React crash course",
 category:"Programming",
 channelId:"channel01",
 uploader:"user01",
 views:15200,
 likes:1023,
 dislikes:45,
 uploadDate:"2024-09-20"
} 
]);

console.log("Seed data inserted");
process.exit();