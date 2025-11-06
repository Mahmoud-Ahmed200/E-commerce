function ResetPass() {
  return (
    <>
      <div>
        <h1 className="mb-5">Reset your password</h1>
      </div>
      
      

      <div className="inputForm">
        <input
          placeholder="Enter Your Password"
          className="input"
          type="password"
        />
      </div>

      

      <div className="inputForm my-3">
        <input placeholder="New Password" className="input" type="password" />
      </div>
      

      <div className="inputForm">
        <input
          placeholder="Confirm Password"
          className="input"
          type="password"
        />
      </div>

      <button className="button-submit">Submit</button>
    </>
  );
}

export default ResetPass;
