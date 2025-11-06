import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <div className="navbarmixed position-sticky top-0 w-100 z-3">
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div className="container">
          <div className="brand">
            <Link className="navbar-brand fw-bold fs-3" to="/">
              <img
                src={logo}
                alt="Logo"
                width="50"
                height="50"
                className="d-inline-block align-text-center rounded-4"
              />
              Modern Tech
            </Link>
          </div>
          <div className="bar2">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="d-flex align-items-center gap-4 icon-section">
                <Link
                  to={'/Login'}
                  className="d-flex align-items-center gap-1 text-decoration-none text-dark navbar-icons"
                >
                  <i className="bi bi-person-circle"></i> <span>Log In / Sign Up</span>
                </Link>
                <Link to="/MyWishlist" className="text-dark navbar-icons">
                  <i className="bi bi-heart fs-5"></i>
                </Link>
                <Link to="/Cart" className="position-relative text-dark navbar-icons">
                  <i className="bi bi-cart3 fs-5"></i>
                  <span className="cart-badge text-bg-dark">0</span>
                </Link>
              </div>

              <form className="d-flex ms-3" role="search" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-dark" type="submit">
                  Search
                </button>
              </form>

              <div className="d-block d-lg-none"> {/* Hide on desktop */}
                <nav className="navbar2">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <Link className="nav-link text-black" to="/products">
                        Mobiles
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-black" to="/products">
                        Laptops
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-black" to="/products">
                        Tablets
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-black" to="/products">
                        Computers
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-black" to="/products">
                        TV
                      </Link>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/about"
                        className={({ isActive }) =>
                          isActive ? 'nav-link text-black active' : 'nav-link text-black'
                        }
                      >
                        About
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                          isActive ? 'nav-link text-black active' : 'nav-link text-black'
                        }
                      >
                        Contact
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar2 d-none d-lg-block">
        <ul className="nav justify-content-center px-5">
          <li className="nav-item">
            <Link className="nav-link text-black" to="/products">
              Mobiles
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-black" to="/products">
              Laptops
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-black" to="/products">
              Tablets
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-black" to="/products">
              Computers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-black" to="/products">
              TV
            </Link>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'nav-link text-black active' : 'nav-link text-black'
              }
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'nav-link text-black active' : 'nav-link text-black'
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;