const Sidebar = ({open}) => {

if(!open) return null;

return(

<div className="sidebar">

<p>Home</p>
<p>Music</p>
<p>Programming</p>
<p>Gaming</p>
<p>Travel</p>

</div>

)

}

export default Sidebar;