import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer>
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-column">
              <h3>Store Location</h3>
              <p>
                500 Terry Francine Street
                <br />
                San Francisco, CA 94158
              </p>
              <p>
                <a href="mailto:info@mysite.com">info@mysite.com</a>
              </p>
              <p>123-456-7890</p>
              <div className="social-icons">
                <button
                  type="button"
                  className="btn btn-link p-0 social-btn"
                  aria-label="Facebook"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fab fa-facebook-f" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-link p-0 social-btn"
                  aria-label="Instagram"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-link p-0 social-btn"
                  aria-label="Twitter"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fab fa-twitter" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-link p-0 social-btn"
                  aria-label="YouTube"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fab fa-youtube" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <div className="footer-column">
              <h3>Shop</h3>
              <ul>
                <li>
                  <Link to="/shop">Shop All</Link>
                </li>
                <li>
                  <Link to="/shop?category=computers">Computers</Link>
                </li>
                <li>
                  <Link to="/shop?category=tablets">Tablets</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Customer Support</h3>
              <ul>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/help">Help Center</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Policy</h3>
              <ul>
                <li>
                  <Link to="/shipping-returns">Shipping &amp; Returns</Link>
                </li>
                <li>
                  <Link to="/terms">Terms &amp; Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <footer className="footer">
        <div className="container text-center">
          <p>© {currentYear} Modern Tech. All Rights Reserved.</p>
          <div className="d-flex justify-content-center gap-3">
            <a
              href="https://www.facebook.com/ziad.waelelsayed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="bi bi-facebook" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/ziad-wael-/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="bi bi-linkedin" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.instagram.com/ziadwael11/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;