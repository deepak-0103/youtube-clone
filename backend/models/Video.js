import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({

title:String,
description:String,
thumbnailUrl:String,
videoUrl:String,
channelName:String,
views:Number,
likes:{
type:Number,
default:0
},
dislikes:{
type:Number,
default:0
},
category:String

});

export default mongoose.model("Video",videoSchema);