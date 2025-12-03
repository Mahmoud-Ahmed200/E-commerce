import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ResetPass() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

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

    if (newPassword !== newPasswordConfirmation) {
      showError("Passwords do not match");
      return;
    }

    if (!token) {
      showError("Invalid or missing reset token. Please use the link from your email.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/auth/resetpassword?token=${token}`,
        { newPassword, newPasswordConfirmation }
      );

      await Swal.fire({
        icon: "success",
        title: "Password reset successfully!",
        text: "Redirecting to login...",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Go to Login",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });

      setTimeout(() => {
        navigate("/Login");
      }, 3000);

    } 
    catch (err) {
      showError(err.response?.data?.message || err.message || "Failed to reset password");
    }
  };

  return (
    <>
      <div className="Login-div"> 
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <h1 className="mb-5">Reset your password</h1>
          </div>

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
