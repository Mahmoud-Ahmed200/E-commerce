import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPass() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (newPassword !== newPasswordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset token. Please use the link from your email.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/auth/resetpassword?token=${token}`,
        { newPassword, newPasswordConfirmation }
      );

      console.log("Password reset success:", response.data.message);
      setSuccessMessage("Password reset successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/Login");
      }, 3000);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to reset password");
    }
  };

  return (
    <>
      <div className="Login-div"> 
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <h1 className="mb-5">Reset your password</h1>
          </div>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}

          <div className="inputForm my-3">
            <input
              placeholder="New Password"
              className="input"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="inputForm">
            <input
              placeholder="Confirm New Password"
              className="input"
              type="password"
              value={newPasswordConfirmation}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button-submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default ResetPass;