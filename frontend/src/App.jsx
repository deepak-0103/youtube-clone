import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";
import Auth from "./pages/Auth";






function App(){

const [sidebar,setSidebar] = useState(false);
const [search,setSearch] = useState("");

return(

<BrowserRouter>

<Header
toggleSidebar={()=>setSidebar(!sidebar)}
setSearch={setSearch}
/>

<Sidebar open={sidebar}/>

<Routes>

<Route path="/" element={<Home search={search}/>}/>
<Route path="/video/:id" element={<VideoPlayer/>}/>
<Route path="/channel/:id" element={<Channel/>}/>
<Route path="/login" element={<Auth/>}/>
<Route path="/channel" element={<Channel/>}/>
</Routes>

</BrowserRouter>

);

}

export default App;