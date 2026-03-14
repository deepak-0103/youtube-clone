import { useState } from "react";
import API from "../services/api";

const UploadVideo = ()=>{

const [title,setTitle] = useState("");
const [videoUrl,setVideoUrl] = useState("");
const [thumbnail,setThumbnail] = useState("");

const channelName = localStorage.getItem("channelName");

const upload = async ()=>{

await API.post("/videos",{
title,
videoUrl,
thumbnail,
views:0,
channelName
});

alert("Video uploaded");

};

return(

<div>

<h2>Upload Video</h2>

<input
placeholder="Title"
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="Video URL"
onChange={(e)=>setVideoUrl(e.target.value)}
/>

<input
placeholder="Thumbnail URL"
onChange={(e)=>setThumbnail(e.target.value)}
/>

<button onClick={upload}>
Upload
</button>

</div>

);

};

export default UploadVideo;