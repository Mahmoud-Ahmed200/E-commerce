import './Account.css';

const App = () => {
  return (
    <>
      <section className="account-section">
        <h2>Account</h2>
        <p>View and edit your personal info below.</p>
      </section>

      <hr />

      <section className="info-section">
        <h3>Personal info</h3>
        <p>Update your personal information.</p>

        <form>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first-name">First name</label>
              <input type="text" id="first-name" />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last name</label>
              <input type="text" id="last-name" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" />
          </div>
          <div className="form-actions">
            <button type="button" className="discard-btn">
              Discard
            </button>
            <button type="submit" className="btn btn-primary">
              Update Info
            </button>
          </div>
        </form>
      </section>

      <section className="info-section">
        <h3>Login info</h3>
        <p>View and update your login email and password.</p>
        <div className="login-details">
          <p>
            <strong>Login email:</strong>
          </p>
          <p>[Email]</p>
          <small>
            Site owners can only change their login email in Wix Account
            Settings.
          </small>
        </div>
        <div className="login-details">
          <p>
            <strong>Password:</strong>
          </p>
          <p>•••••••••</p>
          <small>
            Site owners can only change their password in Wix Account Settings.
          </small>
        </div>
      </section>
    </>
  );
};

export default App;
