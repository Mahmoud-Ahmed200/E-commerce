import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="list-group list-group-flush sidebar bg-white shadow-sm p-3 rounded">
      <NavLink
        to="/AccountSettings/Account"
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        <span>My Account</span>
        <i className="bi bi-person"></i>
      </NavLink>
      <NavLink
        to="/MyOrders"
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        <span>My Orders</span>
        <i className="bi bi-box-seam"></i>
      </NavLink>
      <NavLink
        to="/MyWishlist"
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        <span>My Wishlist</span>
        <i className="bi bi-heart"></i>
      </NavLink>
    </div>
  );
}

export default Sidebar;