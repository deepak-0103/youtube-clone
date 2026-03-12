const channelSchema = new mongoose.Schema({
  channelName: String,
  owner: String,
  description: String,
  channelBanner: String,
  subscribers: Number,
  videos: [String]
});

export default mongoose.model("Channel", channelSchema);