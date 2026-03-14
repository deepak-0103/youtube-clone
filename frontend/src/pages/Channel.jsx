import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Channel = () => {

const username = localStorage.getItem("username");
const [channelName,setChannelName] = useState("");
const navigate = useNavigate();

const createChannel = async () => {

if(!channelName.trim()){
alert("Enter channel name");
return;
}

try{

const res = await API.post("/channel/create",{
name:channelName,
owner:username
});

if(res.status === 201){

alert("Channel created successfully");

// redirect to channel page
navigate(`/channel/${channelName}`);

}

}catch(err){

console.error(err);

if(err.response?.data?.message){
alert(err.response.data.message);
}else{
alert("Channel creation failed");
}

}

};

return(

<div className="channel-page">

<h2>Create Channel</h2>

{!username ? (

<p>Please sign in to create a channel</p>

):( 

<div className="create-channel">

<input
type="text"
placeholder="Enter Channel Name"
value={channelName}
onChange={(e)=>setChannelName(e.target.value)}
/>

<button onClick={createChannel}>
Create Channel
</button>

</div>

)}

</div>

);

};

export default Channel;