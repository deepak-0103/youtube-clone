import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import VideoCard from "../components/VideoCard";

const VideoPlayer = () => {

const { id } = useParams();

const [video,setVideo] = useState(null);
const [suggested,setSuggested] = useState([]);
const [comments,setComments] = useState([]);
const [text,setText] = useState("");
const [editId,setEditId] = useState(null);

useEffect(()=>{
loadVideo();
loadSuggested();
loadComments();
},[id]);

// Load selected video
const loadVideo = async ()=>{
try{
const res = await API.get(`/videos/${id}`);
setVideo(res.data);
}catch(err){
console.error("Error loading video",err);
}
};

// Load suggested videos
const loadSuggested = async ()=>{
try{
const res = await API.get("/videos");
setSuggested(res.data);
}catch(err){
console.error("Error loading suggested videos",err);
}
};

// Load comments
const loadComments = async ()=>{
try{
const res = await API.get(`/comments/${id}`);
setComments(res.data);
}catch{
setComments([]);
}
};

// Add comment
const addComment = async ()=>{
if(!text.trim()) return;

await API.post("/comments",{
videoId:id,
text
});

setText("");
loadComments();
};

// Delete comment
const deleteComment = async (cid)=>{
await API.delete(`/comments/${cid}`);
loadComments();
};

// Edit comment
const updateComment = async ()=>{
await API.put(`/comments/${editId}`,{text});
setEditId(null);
setText("");
loadComments();
};

// Like video
const likeVideo = async ()=>{
const res = await API.put(`/videos/like/${id}`);
setVideo(res.data);
};

// Dislike video
const dislikeVideo = async ()=>{
const res = await API.put(`/videos/dislike/${id}`);
setVideo(res.data);
};

if(!video) return <p>Loading...</p>;

return(

<div className="video-page">

{/* LEFT SIDE - VIDEO */}
<div className="video-main">

<iframe
width="100%"
height="420"
src={video.videoUrl}
title={video.title}
allowFullScreen
loading="lazy"
></iframe>

<h2>{video.title}</h2>

<p>{video.views} views</p>

{/* Channel Link */}
<Link to={`/channel/${video.channelName}`} className="channel-link">

<div className="channel-info">

<img
src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
alt="channel"
className="channel-icon"
/>

<h4>{video.channelName}</h4>

</div>

</Link>

<p>{video.description}</p>

<div className="like-buttons">

<button onClick={likeVideo}>
👍 {video.likes || 0}
</button>

<button onClick={dislikeVideo}>
👎 {video.dislikes || 0}
</button>

</div>

<hr/>

<h3>Comments</h3>

<div className="comment-box">

<input
type="text"
value={text}
placeholder="Add a comment"
onChange={(e)=>setText(e.target.value)}
/>

{editId ? (
<button onClick={updateComment}>Update</button>
) : (
<button onClick={addComment}>Comment</button>
)}

</div>

{comments.map(c=>(
<div key={c._id} className="comment">

<p>{c.text}</p>

<button onClick={()=>{
setEditId(c._id);
setText(c.text);
}}>
Edit
</button>

<button onClick={()=>deleteComment(c._id)}>
Delete
</button>

</div>
))}

</div>

{/* RIGHT SIDE - SUGGESTED VIDEOS */}
<div className="suggested">

<h3>Suggested Videos</h3>

{suggested
.filter(v => v._id !== id && v?.title)
.slice(0,8)
.map(v => (

<div key={v._id} className="suggested-card">
<VideoCard video={v}/>
</div>

))}

</div>

</div>

);

};

export default VideoPlayer;