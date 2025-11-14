import { Link } from "react-router-dom";
import "./ForgetPassword.css";
import "./Login.css";
import { useState } from "react";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/forgotpassword",
        { email }
      );

      console.log("Reset link sent:", response.data.message);
      setSuccessMessage(response.data.message || "Password reset link has been sent to your email.");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to send reset link");
    }
  };

  return (
    <>
      <div className="ForgetPassword-div">
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-center">Forget Password </h1>
          </div>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}

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