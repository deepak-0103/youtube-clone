import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Auth = () => {

const [isLogin,setIsLogin] = useState(true);

const [username,setUsername] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleSubmit = async () => {

if(isLogin){

const res = await API.post("/auth/login",{
email,
password
});

localStorage.setItem("token",res.data.token);
localStorage.setItem("username",res.data.username);

window.location.href = "/";   // forces header refresh

}else{

await API.post("/auth/register",{
username,
email,
password
});

alert("Registration successful! Please login.");
setIsLogin(true);

}

};

return(

<div style={{width:"300px",margin:"100px auto"}}>

<h2>{isLogin ? "Sign In" : "Register"}</h2>

{!isLogin && (

<input
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

)}

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

<button onClick={handleSubmit}>
{isLogin ? "Login" : "Register"}
</button>

<p>

{isLogin ? "Don't have an account?" : "Already have an account?"}

<span
style={{color:"blue",cursor:"pointer",marginLeft:"6px"}}
onClick={()=>setIsLogin(!isLogin)}
>

{isLogin ? "Register" : "Login"}

</span>

</p>

</div>

);

};

export default Auth;