import "./Signup.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter both first and last name");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    try {
      console.log("Sending signup request...", { fullName, email });
      
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

      console.log("Response:", response.data);

      console.log("Sign up successful:", response.data.user);
      alert("Sign up successful! Please check your email to verify your account.");
      
      navigate("/Login");

    } catch (err) {
      console.error("Signup error:", err);
      
      if (err.response) {
        setError(err.response.data.message || err.response.data.error || "Sign up failed");
      } 
        else if (err.request) {
        setError("No response from server. Please check if the backend is running.");
      } 
      else {
        setError(err.message || "An error occurred during sign up");
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
          
          {error && (
            <div style={{ 
              color: "red", 
              textAlign: "center", 
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#ffebee",
              borderRadius: "4px"
            }}>
              {error}
            </div>
          )}

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