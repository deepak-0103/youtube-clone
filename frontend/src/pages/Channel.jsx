import { useEffect,useState } from "react";
import API from "../services/api";
import VideoCard from "../components/VideoCard";

const Channel = () => {

const username = localStorage.getItem("username");

const [channelName,setChannelName] = useState("");
const [description,setDescription] = useState("");
const [videos,setVideos] = useState([]);


// create channel
const createChannel = async ()=>{

await API.post("/channel/create",{
name:channelName,
description,
owner:username
});

alert("Channel Created");

loadVideos();

};


// load channel videos
const loadVideos = async ()=>{

const res = await API.get(`/channel/${channelName}`);

setVideos(res.data);

};

useEffect(()=>{

if(channelName){
loadVideos();
}

},[channelName]);


const deleteVideo = async (id)=>{

await API.delete(`/videos/${id}`);

loadVideos();

};

return(

<div>

<h2>My Channel</h2>

{!username ? (

<p>Please sign in to create a channel</p>

):( 

<div>

<h3>Create Channel</h3>

<input
placeholder="Channel Name"
value={channelName}
onChange={(e)=>setChannelName(e.target.value)}
/>

<input
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<button onClick={createChannel}>
Create Channel
</button>

</div>

)}

<hr/>

<h3>Channel Videos</h3>

<div className="video-grid">

{videos.map(v => (

<div key={v._id}>

<VideoCard video={v}/>

<button>
Edit
</button>

<button onClick={()=>deleteVideo(v._id)}>
Delete
</button>

</div>

))}

</div>

</div>

);

};

export default Channel;