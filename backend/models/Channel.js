import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({

name:String,
owner:String,   // userId
description:String

});

export default mongoose.model("Channel",channelSchema);