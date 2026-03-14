import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: e.target.email.value,
        password: e.target.password.value
      });
      setCurrentUser(res.data); // update context
      localStorage.setItem("user", JSON.stringify(res.data)); // persist
      navigate("/"); // redirect to homepage
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input name="email" placeholder="Email" />
      <input name="password" placeholder="Password" type="password" />
      <button>Login</button>
    </form>
  );
}

export default Login;