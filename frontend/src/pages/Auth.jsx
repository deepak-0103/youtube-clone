import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        // Login logic
        const res = await API.post("/auth/login", {
          email,
          password
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.username);
        
        // Use navigate instead of window.location for SPA
        navigate("/");
      } else {
        // Register logic
        await API.post("/auth/register", {
          username,
          email,
          password
        });

        alert("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>{isLogin ? "Sign In" : "Register"}</h2>

      {!isLogin && (
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "10px" }}
        />
      )}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px", padding: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "15px", padding: "10px" }}
      />

      <button 
        onClick={handleSubmit}
        style={{ 
          width: "100%", 
          padding: "12px", 
          backgroundColor: "#007bff", 
          color: "white", 
          border: "none", 
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        {isLogin ? "Login" : "Register"}
      </button>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span
          style={{ color: "blue", cursor: "pointer", marginLeft: "6px", fontWeight: "bold" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default Auth;
