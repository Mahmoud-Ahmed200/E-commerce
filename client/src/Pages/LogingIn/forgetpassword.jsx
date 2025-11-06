import { Link } from "react-router-dom";
import "./ForgetPassword.css";
import "./Login.css";

function ForgetPassword() {
  return (
    <>
      <div className="ForgetPassword-div">
        <form className="form">
          <div>
            <h1 className="text-center">Forget Password </h1>
          </div>
          <div className="flex-column">
            <label>Email </label>
          </div>
          <div className="inputForm">
            <i class="bi bi-envelope-at"></i>
            <input
              placeholder="Enter your Email"
              className="input"
              type="text"
            />
          </div>
          <button className="button-submit">Submit</button>
          <Link className="text-decoration-none text-center blue-sign" to={"/Login"}>
            Back To Log In
          </Link>
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
