import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signin", 
        { email, password }
      );

      setUser(response.data.user);
      
      navigate("/");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <>
      <div className="Login-div">
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-center">Log In</h1>
          </div>
          
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <div className="flex-column">
            <label>Email </label>
          </div>
          <div className="inputForm">
            <i className="bi bi-envelope-at"></i>
            <input
              placeholder="Enter your Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex-column">
            <label>Password </label>
          </div>
          <div className="inputForm">
            <i className="bi bi-lock"></i>
            <input
              placeholder="Enter your Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex-row">
            <div className="remember">
              <input className="form-check-input" type="checkbox" />
              <label className="mx-2">Remember me </label>
            </div>
            <Link className="text-decoration-none blue-sign" to={"/ForgetPassword"}>
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="button-submit">Log In</button>
          <p className="p">
            Don't have an account?{" "}
            <Link className="text-decoration-none blue-sign" to={"/Signup"}>
              Sign Up
            </Link>
          </p>
          <p className="p line">Or With</p>

          <div className="flex-column">
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;