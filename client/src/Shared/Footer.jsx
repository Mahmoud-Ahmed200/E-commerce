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
                22 Tahrir street
                <br />
                Cairo, Egypt
              </p>
              <p>
                <a href="mailto:info@mysite.com">ModernTech@mysite.com</a>
              </p>
              <p>+20 106 575 4308</p>
            </div>

            <div className="footer-column">
              <h3>Shop</h3>
              <ul>
                <li>
                  <Link to="/products">Shop All</Link>
                </li>
                <li>
                  <Link to="/products?category=Laptop">Laptops</Link>
                </li>
                <li>
                  <Link to="/products?category=Tablet">Tablets</Link>
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
                  <Link to="/not-found">Help Center</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Policy</h3>
              <ul>
                <li>
                  <Link to="/not-found">Shipping &amp; Returns</Link>
                </li>
                <li>
                  <Link to="/not-found">Terms &amp; Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <footer className="footer">
        <div className="container text-center">
          <p>© {currentYear} Modern Tech. All Rights Reserved.</p>
          <div className="d-flex justify-content-center gap-3 social-icons">
            <a
              href="https://www.facebook.com/ziad.waelelsayed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="facebook"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/ziad-wael-/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="linkedin"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a
              href="https://www.instagram.com/ziadwael11/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="instagram"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://github.com/Ziadwael0/E-commerce-website-"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="github"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://www.youtube.com/@ZiadVictory"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="youtube"
            >
              <i className="bi bi-youtube"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
