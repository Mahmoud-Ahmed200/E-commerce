import { Link } from 'react-router-dom';
import Sidebar from './SideBar.jsx';
import HelpSection from '../Cart/Help.jsx';
import './Wishlist.css';
import acerlaptop from '../../assets/acerlaptop.jpg';
import cmfbuds from '../../assets/cmfbuds.jpg';
import huweifreebuds from '../../assets/Huweifreebuds.jpg';

function WishlistPage() {
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
                  <Link to="/my-account" className="dropdown-item d-flex justify-content-between align-items-center">
                    <span>My Account</span>
                    <i className="bi bi-person"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/MyOrders" className="dropdown-item d-flex justify-content-between align-items-center">
                    <span>My Orders</span>
                    <i className="bi bi-box-seam"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/MyWishlist" className="dropdown-item d-flex justify-content-between align-items-center active">
                    <span>My Wishlist</span>
                    <i className="bi bi-heart"></i>
                  </Link>
                </li>
              </ul>
            </div>
            
            <h2 className="mb-4">My Wishlist</h2>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
              <div className="col">
                <div className="card product-card h-100">
                  <a href="#" className="text-danger delete-icon"><i className="bi bi-trash"></i></a>
                  <img src={acerlaptop} className="card-img-top" alt="Acer Laptop" />
                  <div className="card-body d-flex flex-column">
                    <div className="mb-2">
                      <small className="text-muted">(0.0) <i className="bi bi-star-fill rating-stars"></i></small>
                    </div>
                    <h5 className="card-title">Acer Aspire Slim 3 A315-59-50XR - Laptop - Intel® Core™ i5-1235U - 8GB RAM...</h5>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div className="price-section">
                        <span className="current-price d-block">EGP 19,152</span>
                        <span className="old-price">EGP 19,999</span>
                      </div>
                      <a href="#" className="btn cart-btn"><i className="bi bi-cart-plus"></i></a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="col">
                <div className="card product-card h-100">
                  <a href="#" className="text-danger delete-icon"><i className="bi bi-trash"></i></a>
                  <img src={cmfbuds} className="card-img-top" alt="CMF Earbuds" />
                  <div className="card-body d-flex flex-column">
                    <div className="mb-2">
                      <small className="text-muted">(0.0) <i className="bi bi-star-fill rating-stars"></i></small>
                    </div>
                    <h5 className="card-title">CMF By Nothing Wireless Earbuds Pro 2 - Dark Grey</h5>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div className="price-section">
                        <span className="current-price d-block">EGP 3,299</span>
                        <span className="old-price">EGP 3,500</span>
                      </div>
                      <a href="#" className="btn cart-btn"><i className="bi bi-cart-plus"></i></a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 3 */}
              <div className="col">
                <div className="card product-card h-100">
                  <a href="#" className="text-danger delete-icon"><i className="bi bi-trash"></i></a>
                  <img src={huweifreebuds} className="card-img-top" alt="Huawei Earbuds" />
                  <div className="card-body d-flex flex-column">
                    <div className="mb-2">
                      <small className="text-muted">(0.0) <i className="bi bi-star-fill rating-stars"></i></small>
                    </div>
                    <h5 className="card-title">Huawei FreeBuds 7i Wireless Earbuds - Pink</h5>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div className="price-section">
                        <span className="current-price d-block">EGP 3,999</span>
                        <span className="old-price">EGP 4,200</span>
                      </div>
                      <a href="#" className="btn cart-btn"><i className="bi bi-cart-plus"></i></a>
                    </div>
                  </div>
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

export default WishlistPage;