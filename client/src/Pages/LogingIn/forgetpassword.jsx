import { Link } from "react-router-dom";
import "./ForgetPassword.css";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ForgetPassword() {
  const [email, setEmail] = useState("");

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
        "http://localhost:3000/api/v1/auth/forgotpassword",
        { email }
      );

      await Swal.fire({
          icon: 'success',
          title: 'Reset Link Sent!',
          text: 'Please check your email.',
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
      showError(err.response?.data?.message || err.message || "Failed to send reset link");
    }
  };

  return (
    <>
      <div className="ForgetPassword-div">
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-center">Forget Password </h1>
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
          <button type="submit" className="button-submit">Submit</button>
          <Link className="text-decoration-none text-center blue-sign" to={"/Login"}>
            Back To Log In
          </Link>
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
