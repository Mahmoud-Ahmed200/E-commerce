import "./Home.css";
import { Link } from "react-router-dom";
import iphone16 from "../assets/iphone16.png";
import laptop from "../assets/laptop wallpaper.avif";
import mobile from "../assets/mobile wallpaper.avif";
import watch from "../assets/smart watch wallpaper.avif";

function Home() {
  return (
    <>
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

                <Link to={"/Products"}>
                  <button className="cta">
                    <span className="hover-underline-animation ">
                      {" "}
                      Shop now{" "}
                    </span>
                    <svg
                      id="arrow-horizontal"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="10"
                      viewBox="0 0 46 16"
                    >
                      <path
                        id="Path_10"
                        data-name="Path 10"
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

      {/* FEATURED PRODUCTS */}
      <div className="container mb-5">
        <h2 className="fw-bold mb-4">Featured Products</h2>
        <div className="row g-4">
          {/* Product 1 */}
          <div className="d-flex justify-content-center col-md-3">
            <div className="card h-100">
              <Link
                to="/products/ProductDetails"
                className="text-decoration-none"
              >
                <div className="card-img">
                  <img src={iphone16} alt="iPhone 16" className="img-fluid" />
                </div>
                <div className="card-body p-3">
                  <h4 className="card-title fs-5">Apple iPhone 16</h4>
                  <div className="card-details">
                    <div className="price">
                      <span className="text-muted small">Price</span>
                      <p className="mb-3">$899.00</p>
                    </div>
                  </div>
                  <button className="btn btn-primary w-100">
                    + Add To Cart
                  </button>
                </div>
              </Link>
            </div>
          </div>
          {/* ... other products */}
        </div>
      </div>

      {/* FEATURES */}
      <div className="container my-5 text-center">
        <div className="row g-4">
          <div className="col-md-4">
            <i className="bi bi-truck fs-1 "></i>
            <h5 className="mt-2">Fast Shipping</h5>
            <p className="text-muted small">
              Get your devices delivered quickly.
            </p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-shield-lock fs-1 "></i>
            <h5 className="mt-2">Secure Payments</h5>
            <p className="text-muted small">
              Shop safely with encrypted payments.
            </p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-star fs-1 "></i>
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
