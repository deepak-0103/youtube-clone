import { useParams } from "react-router-dom";

const VideoChannel = () => {

const { channelName } = useParams();

return(

<div className="video-channel-page">

<img
src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
alt="channel"
className="channel-avatar"
/>

<h2>{channelName}</h2>

</div>

);

};

export default VideoChannel;