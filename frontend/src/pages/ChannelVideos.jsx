import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ChannelVideos = ()=>{

const { name } = useParams();

const [videos,setVideos] = useState([]);

const [title,setTitle] = useState("");
const [videoUrl,setVideoUrl] = useState("");
const [thumbnailUrl,setThumbnailUrl] = useState("");

const [editId,setEditId] = useState(null);


// LOAD VIDEOS
const loadVideos = async ()=>{

try{

const res = await API.get(`/videos/channel/${name}`);

setVideos(res.data);

}catch(err){

console.log(err);

}

};

useEffect(()=>{

loadVideos();

},[name]);


// CREATE VIDEO
const createVideo = async ()=>{

if(!title || !videoUrl) return;

await API.post("/videos",{
title,
videoUrl,
thumbnailUrl,
views:0,
channelName:name
});

setTitle("");
setVideoUrl("");
setThumbnailUrl("");

loadVideos();

};


// DELETE VIDEO
const deleteVideo = async (id)=>{

await API.delete(`/videos/${id}`);

loadVideos();

};


// EDIT VIDEO
const startEdit = (video)=>{

setEditId(video._id);

setTitle(video.title);
setVideoUrl(video.videoUrl);
setThumbnailUrl(video.thumbnailUrl);

};


// UPDATE VIDEO
const updateVideo = async ()=>{

await API.put(`/videos/${editId}`,{
title,
videoUrl,
thumbnailUrl
});

setEditId(null);

setTitle("");
setVideoUrl("");
setThumbnailUrl("");

loadVideos();

};


return(

<div className="channel-dashboard">

{/* CHANNEL HEADER */}

<div className="channel-header">

<img
src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
className="channel-avatar"
/>

<h2>{name}</h2>

</div>

<hr/>

{/* UPLOAD FORM */}

<h3>{editId ? "Edit Video" : "Upload Video"}</h3>

<input
placeholder="Video Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="Video URL"
value={videoUrl}
onChange={(e)=>setVideoUrl(e.target.value)}
/>

<input
placeholder="Thumbnail URL"
value={thumbnailUrl}
onChange={(e)=>setThumbnailUrl(e.target.value)}
/>

{editId ? (

<button onClick={updateVideo}>
Update Video
</button>

):( 

<button onClick={createVideo}>
Upload Video
</button>

)}

<hr/>

{/* VIDEO LIST */}

<h3>Your Videos</h3>

{videos.length === 0 ? (

<p>No videos uploaded</p>

):( 

videos.map(video=>(

<div key={video._id} className="video-item">

<img
src={video.thumbnailUrl}
width="200"
/>

<h4>{video.title}</h4>

<p>{video.views} views</p>

<button onClick={()=>startEdit(video)}>
Edit
</button>

<button onClick={()=>deleteVideo(video._id)}>
Delete
</button>

</div>

))

)}

</div>

);

};

export default ChannelVideos;