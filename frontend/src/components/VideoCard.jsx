import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {

if(!video || !video.title) return null;

return(

<div className="video-card">

{/* Thumbnail */}
<Link to={`/video/${video._id}`}>

<img
src={video.thumbnail || video.thumbnailUrl || "https://via.placeholder.com/300x170"}
alt={video.title}
className="thumbnail"
/>

</Link>

{/* Title */}
<h4>{video.title}</h4>

{/* Channel Name */}
<Link to={`/channel/${video.channelName}`} className="channel-link">

<p className="channel">
{video.channelName}
</p>

</Link>

{/* Views */}
<p>{video.views || 0} views</p>

</div>

);

};

export default VideoCard;