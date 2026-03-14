import { Link } from "react-router-dom";

const Header = ({ toggleSidebar, setSearch }) => {

const username = localStorage.getItem("username");


const logout = () => {
localStorage.clear();
window.location.reload();
};

return (

<header className="header">

{/* Sidebar Toggle */}
<button onClick={toggleSidebar} className="menu-btn">
☰
</button>

{/* YouTube Logo */}
<Link to="/" className="logo">
<img
src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
alt="YouTube"
className="youtube-logo"
/>
</Link>

{/* Search Bar */}
<input
type="text"
placeholder="Search"
className="search-bar"
onChange={(e)=>setSearch(e.target.value)}
/>

{/* Right Section */}
<div className="header-right">

{username ? (

<div className="user-section">

<span className="username">
👤 {username}
</span>

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>

):( 

<Link to="/login">
<button className="signin-btn">
Sign In
</button>
</Link>

)}

<Link to="/channel">
<button>My Channel</button>
</Link>

</div>

</header>

);

};

export default Header;