const videoSchema = new mongoose.Schema({
  title: String,
  thumbnailUrl: String,
  description: String,
  videoUrl: String,
  channelId: String,
  uploader: String,
  views: Number,
  likes: Number,
  dislikes: Number,
  category: String,
  uploadDate: Date
});

export default mongoose.model("Video", videoSchema);