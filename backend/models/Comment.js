import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
videoId:String,
text:String,
createdAt:{
type:Date,
default:Date.now
}
});

export default mongoose.model("Comment",commentSchema);