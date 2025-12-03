import "./Signup.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

    if (!firstName.trim() || !lastName.trim()) {
      showError("Please enter both first and last name");
      return;
    }

    if (!email.trim() || !password.trim()) {
      showError("Please enter both email and password");
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    try {      
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        {
          fullName,
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );

      await Swal.fire({
        icon: 'success',
        title: 'Sign Up Successful!',
        text: 'Please check your email to verify your account.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Go to Login',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });

      navigate("/Login");

    } 
    catch (err) {      
      if (err.response) {
        showError(err.response.data.message || err.response.data.error || "Sign up failed");
      } 
      else if (err.request) {
        showError("No response from server. Please check if the backend is running.");
      } 
      else {
        showError(err.message || "An error occurred during sign up");
      }
    }
  };

  return (
    <>
      <div className="Signup-div">
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-center">Sign up</h1>
          </div>

          <div className="flex-column">
            <label>First Name </label>
          </div>
          <div className="inputForm">
            <i className="bi bi-person"></i>
            <input
              placeholder="First Name"
              className="input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="flex-column">
            <label>Last Name </label>
          </div>
          <div className="inputForm">
            <i className="bi bi-person"></i>
            <input
              placeholder="Last Name"
              className="input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
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
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className="button-submit"
          >
            Sign Up
          </button>
          
          <p className="p">
            Do have an account already?{" "}
            <Link className="text-decoration-none mx-2 blue-sign" to={"/Login"}>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignUp;
