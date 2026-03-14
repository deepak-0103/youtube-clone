import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {

if(!video.title) return null;

return(

<div className="video-card">

<Link to={`/video/${video._id}`}>
<img src={video.thumbnailUrl} className="thumbnail"/>
</Link>

<h4>{video.title}</h4>

<Link to={`/channel/${video.channelName}`}>
<p className="channel">{video.channelName}</p>
</Link>

<p>{video.views} views</p>

</div>

);

}

export default VideoCard;