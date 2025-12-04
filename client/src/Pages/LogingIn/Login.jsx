import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
axios.defaults.withCredentials = true;

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const showError = (message) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signin", 
        { email, password }
      );

      setUser(response.data.user);
      
      navigate("/");

    } 
    catch (err) {
      showError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <>
      <div className="Login-div">
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-center">Log In</h1>
          </div>
          
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
          </div>
          <button type="submit" className="button-submit">Log In</button>
          <p className="p">
            Don't have an account?{" "}
            <Link className="text-decoration-none blue-sign" to={"/Signup"}>
              Sign Up
            </Link>
          </p>
          
        </form>
      </div>
    </>
  );
}

export default Login;
