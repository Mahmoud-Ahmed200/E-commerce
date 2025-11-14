import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import laptop from "../assets/laptop wallpaper.avif";
import mobile from "../assets/mobile wallpaper.avif";
import watch from "../assets/smart watch wallpaper.avif";
import laptopImg from "../assets/laptop.avif";
import mobileImg from "../assets/mobile.jpg";
import tvImg from "../assets/TV.jpg";
import tabletImg from "../assets/Tablet.jpg";

axios.defaults.withCredentials = true;

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const fetchFeaturedProducts = async () => {
    setLoading(true);
    setError(null);
    try {
  
      const res = await axios.get(
        "http://localhost:3000/api/v1/product?limit=4&sortBy=newest"
      );
      setFeaturedProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching featured products:", err);
      setError("Failed to load featured products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="mb-5">
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade position-relative"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div
              className="hero d-flex align-items-center p-5 text-dark position-absolute h-100"
              id="hero"
            >
              <div className="hero-content w-75">
                <h4>
                  <span className="badge text-bg-danger mb-5">Best Prices</span>
                </h4>
                <h1 className="display-5 fw-bold">
                  Incredible Prices on All Your Favorite Items
                </h1>
                <ul className="d-flex gap-4 mb-4 list-unstyled categories">
                  <li>Mobiles</li>
                  <li>Laptops</li>
                  <li>Tablets</li>
                  <li>Accessories</li>
                </ul>

                <Link to={"/products"}>
                  <button className="cta">
                    <span className="hover-underline-animation">Shop now</span>
                    <svg
                      id="arrow-horizontal"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="10"
                      viewBox="0 0 46 16"
                    >
                      <path
                        id="Path_10"
                        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                        transform="translate(30)"
                      ></path>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
            <div className="carousel-item active">
              <img src={laptop} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={mobile} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={watch} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="fw-bold mb-5 text-center ">Shop by Category</h2>
        <div className="row g-4 text-center">
          <div className="col-md-3">
            <Link
              to="/products?category=Laptop"
              className="text-decoration-none text-dark"
            >
              <div className="category-card">
                <img
                  src={laptopImg}
                  alt="Laptop"
                  className="img-fluid rounded shadow-sm"
                />
                <h5 className="mt-3">Laptops</h5>
              </div>
            </Link>
          </div>

          <div className="col-md-3">
            <Link
              to="/products?category=Mobile"
              className="text-decoration-none text-dark"
            >
              <div className="category-card">
                <img
                  src={mobileImg}
                  alt="Mobile"
                  className="img-fluid w-50 rounded shadow-sm"
                />
                <h5 className="mt-3">Mobiles</h5>
              </div>
            </Link>
          </div>

          <div className="col-md-3">
            <Link
              to="/products?category=TV"
              className="text-decoration-none text-dark"
            >
              <div className="category-card">
                <img
                  src={tvImg}
                  alt="TV"
                  className="img-fluid rounded shadow-sm"
                />
                <h5 className="mt-3">TVs</h5>
              </div>
            </Link>
          </div>

          <div className="col-md-3">
            <Link
              to="/products?category=Tablet"
              className="text-decoration-none text-dark"
            >
              <div className="category-card">
                <img
                  src={tabletImg}
                  alt="Tablet"
                  className="img-fluid w-75 rounded shadow-sm"
                />
                <h5 className="mt-3">Tablets</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className=" container mb-5 ">
        <h2 className="fw-bold mb-4">Featured Products</h2>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : featuredProducts.length === 0 ? (
          <p className="text-muted">No featured products available.</p>
        ) : (
          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="card card-feature d-flex justify-content-center col-md-3 col-sm-6 "
              >
                <div className="card-body h-100 rounded shadow-sm">
                  <Link
                    to={`/products/${product._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="card-img">
                      <img
                        src={
                          product.images?.[0]?.url ||
                          "https://via.placeholder.com/300"
                        }
                        alt={product.name}
                        className="img-fluid"
                      />
                    </div>
                    <div className="card-body p-3">
                      <h4 className="card-title fs-5">{product.name}</h4>
                      <div className="card-details">
                        <div className="price">
                          <span className="text-muted small">Price</span>
                          <p className="mb-3 ">
                            ${product.price?.toLocaleString()}
                          </p>
                        </div>
                        
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-4">
          <Link to="/products" className="btn btn-outline-primary">
            View All Products
          </Link>
        </div>
      </div>

      {/* 🌐 Info Section */}
      <div className="container my-5 text-center">
        <div className="row g-4">
          <div className="col-md-4">
            <i className="bi bi-truck fs-1"></i>
            <h5 className="mt-2">Fast Shipping</h5>
            <p className="text-muted small">
              Get your devices delivered quickly.
            </p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-shield-lock fs-1"></i>
            <h5 className="mt-2">Secure Payments</h5>
            <p className="text-muted small">
              Shop safely with encrypted payments.
            </p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-star fs-1"></i>
            <h5 className="mt-2">Top Quality</h5>
            <p className="text-muted small">
              We provide the best verified tech brands.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
