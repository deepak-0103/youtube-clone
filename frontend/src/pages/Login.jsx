import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = ()=>{

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const login = async ()=>{

try{

const res = await API.post("/auth/login",{
email,
password
});

localStorage.setItem("token",res.data.token);
localStorage.setItem("username",res.data.username);

navigate("/");

}catch{

alert("Invalid login");

}

};

return(

<div className="auth-page">

<h2>Sign In</h2>

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

<button onClick={login}>
Login
</button>

</div>

);

};

export default Login;