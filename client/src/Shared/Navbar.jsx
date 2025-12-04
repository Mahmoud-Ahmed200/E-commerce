import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./search";
import "./Navbar.css";
import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

const defaultAvatar = "https://i.imgur.com/6VBx3io.png";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const getFirstName = (fullName) => {
    if (!fullName) return "";
    return fullName.split(" ")[0];
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/auth/signout");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setUser(null);
    navigate("/");
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  const fetchCartCount = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/cart");
      const count = res.data.userCart?.items?.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartCount(count || 0);
    } catch (error) {
      setCartCount(0);
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();

    const handleCartUpdate = () => fetchCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <div className="navbarmixed position-sticky top-0 w-100 z-3">
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div className="container">
          <div className="brand">
            <Link className="navbar-brand" to="/">
              {/* <img
                src={logo}
                alt="Logo"
                width="50"
                height="50"
                className="d-inline-block align-text-center rounded-4"
              /> */}
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

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="d-flex align-items-center gap-4 icon-section">
                {user ? (
                  <>
                    <Link
                      to="/AccountSettings/Account"
                      className="d-flex align-items-center gap-2 text-decoration-none text-dark navbar-icons"
                      title="My Account"
                    >
                      <img
                        alt="Profile"
                        src={user.profilePhoto?.url || defaultAvatar}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <span>Hi, {getFirstName(user.fullName)}</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="btn btn-link text-decoration-none text-dark navbar-icons p-0"
                      title="Log Out"
                    >
                      <i className="bi bi-box-arrow-right fs-5"></i>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/Login"
                    className="d-flex align-items-center gap-1 text-decoration-none text-dark navbar-icons"
                  >
                    <i className="bi bi-person-circle"></i>{" "}
                    <span>Log In / Sign Up</span>
                  </Link>
                )}

                <Link to="/MyWishlist" className="text-dark navbar-icons">
                  <i className="bi bi-heart fs-5"></i>
                </Link>

                <Link
                  to="/Cart"
                  className="position-relative text-dark navbar-icons"
                >
                  <i className="bi bi-cart3 fs-5"></i>
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </Link>
              </div>

              
              <SearchBar />

              <div className="d-block d-lg-none">
                <nav className="navbar2">
                  <ul className="nav flex-column">
                    {["Mobile", "Laptop", "Tablet", "Computer", "TV"].map(
                      (cat) => (
                        <li key={cat} className="nav-item">
                          <button
                            onClick={() => handleCategoryClick(cat)}
                            className="nav-link text-black bg-transparent border-0 text-start"
                          >
                            {cat}s
                          </button>
                        </li>
                      )
                    )}
                    <li className="nav-item">
                      <NavLink
                        to="/about"
                        className={({ isActive }) =>
                          isActive
                            ? "nav-link text-black active"
                            : "nav-link text-black"
                        }
                      >
                        About
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                          isActive
                            ? "nav-link text-black active"
                            : "nav-link text-black"
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
          {["Mobile", "Laptop", "Tablet", "Computer", "TV"].map((cat) => (
            <li key={cat} className="nav-item">
              <button
                onClick={() => handleCategoryClick(cat)}
                className="nav-link text-black bg-transparent border-0"
              >
                {cat}s
              </button>
            </li>
          ))}

          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link text-black active" : "nav-link text-black"
              }
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link text-black active" : "nav-link text-black"
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
