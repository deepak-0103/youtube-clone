import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = ()=>{

const [username,setUsername] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const register = async ()=>{

await API.post("/auth/register",{
username,
email,
password
});

alert("Registration successful");

navigate("/login");

};

return(

<div className="auth-page">

<h2>Create Account</h2>

<input
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={register}>
Register
</button>

</div>

);

};

export default Register;