import { Outlet, NavLink } from 'react-router-dom';
import './Account.css'; 

function SettingsLayout() {
  return (
    <div className="settings-layout">
    <div className="settings-container">
      <header>
        <h1>Account Settings</h1>
        <nav>
          <ul>
            <NavLink to={'/AccountSettings/Account'} end>My Account</NavLink>
            <NavLink to={'/AccountSettings/Addresses'}>My Addresses</NavLink>
            <NavLink to={'/AccountSettings/Wallet'}>My Wallet</NavLink>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  </div>
  );
}

export default SettingsLayout;