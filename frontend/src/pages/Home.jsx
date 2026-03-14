import { useEffect, useState } from "react";
import API from "../services/api";
import VideoCard from "../components/VideoCard";
import FilterButtons from "../components/FilterButtons";

const Home = ({search}) => {

const [videos,setVideos] = useState([]);
const [category,setCategory] = useState("");

useEffect(()=>{

let url="/videos";

if(category){
url = `/videos?category=${category}`;
}

API.get(url)
.then(res=>setVideos(res.data));

},[category]);

const filteredVideos = videos.filter(v =>
(v.title || "").toLowerCase().includes(search.toLowerCase())
);

return(

<div>

<FilterButtons setCategory={setCategory}/>

<div className="grid">

{filteredVideos.map(video => (
<VideoCard key={video._id} video={video}/>
))}

</div>

</div>

);

}

export default Home;