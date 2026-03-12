const commentSchema = new mongoose.Schema({
  videoId: String,
  userId: String,
  text: String,
  timestamp: Date
});

export default mongoose.model("Comment", commentSchema);