import { Link } from 'react-router-dom';
import Sidebar from '../Wishlist/SideBar.jsx';
import HelpSection from '../Cart/Help.jsx';
import './Orders.css'; 
import acerlaptop from '../../assets/acerlaptop.jpg';
import cmfbuds from '../../assets/cmfbuds.jpg';
import huweifreebuds from '../../assets/Huweifreebuds.jpg';

function OrdersPage() {
  return (
    <>
      <div className="container-fluid my-4 px-5">
        <div className="row">
          <div className="col-lg-9">
            <div className="dropdown d-lg-none mb-4">
              <button
                className="btn btn-outline-dark dropdown-toggle w-100"
                type="button"
                id="mobileMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-list me-2"></i>
                My Account Menu
              </button>
              <ul className="dropdown-menu w-100 fade" aria-labelledby="mobileMenuButton">
                <li>
                  <Link to="/AccountSettings/Account" className="dropdown-item d-flex justify-content-between align-items-center">
                    <span>My Account</span>
                    <i className="bi bi-person"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/MyOrders14" className="dropdown-item d-flex justify-content-between align-items-center active">
                    <span>My Orders</span>
                    <i className="bi bi-box-seam"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/MyWishlist" className="dropdown-item d-flex justify-content-between align-items-center">
                    <span>My Wishlist</span>
                    <i className="bi bi-heart"></i>
                  </Link>
                </li>
              </ul>
            </div>

            <h2 className="mb-4 text-lg-start text-center">My Orders</h2>

            <div className="order-list">
              <div className="card order-card mb-4">
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
                  <div className="me-3 mb-2 mb-md-0">
                    <strong className="d-block">Order #123456</strong>
                    <small className="text-muted">Placed on: Oct 25, 2025</small>
                  </div>
                  <strong className="fs-6">Total: EGP 22,451</strong>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img src={acerlaptop} className="order-product-img" alt="Acer Laptop" />
                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-0">Acer Aspire Slim 3 A315-59-50XR - Laptop...</h6>
                      <small className="text-muted">Qty: 1</small>
                    </div>
                    <span className="ms-3 fw-bold">EGP 19,152</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <img src={cmfbuds} className="order-product-img" alt="CMF Earbuds" />
                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-0">CMF By Nothing Wireless Earbuds Pro 2 - Dark Grey</h6>
                      <small className="text-muted">Qty: 1</small>
                    </div>
                    <span className="ms-3 fw-bold">EGP 3,299</span>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Status:</strong>
                    <span className="badge bg-success">Delivered</span>
                  </div>
                  <a href="#" className="btn btn-dark btn-sm">View Details</a>
                </div>
              </div>

              <div className="card order-card mb-4">
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
                  <div className="me-3 mb-2 mb-md-0">
                    <strong className="d-block">Order #123457</strong>
                    <small className="text-muted">Placed on: Oct 26, 2025</small>
                  </div>
                  <strong className="fs-6">Total: EGP 3,999</strong>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <img src={huweifreebuds} className="order-product-img" alt="Huawei Earbuds" />
                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-0">Huawei FreeBuds 7i Wireless Earbuds - Pink</h6>
                      <small className="text-muted">Qty: 1</small>
                    </div>
                    <span className="ms-3 fw-bold">EGP 3,999</span>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Status:</strong>
                    <span className="badge bg-warning text-dark">Shipping</span>
                  </div>
                  <a href="#" className="btn btn-dark btn-sm">Track Order</a>
                </div>
              </div>
                            
            </div>
          </div>

          <div className="col-lg-3 d-none d-lg-block">
            <Sidebar />
          </div>
        </div>
      </div>
      <HelpSection />
    </>
  );
}

export default OrdersPage;