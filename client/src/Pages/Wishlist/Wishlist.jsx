import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./SideBar.jsx"; // Assuming this path is correct
import HelpSection from "../Cart/Help.jsx"; // Assuming this path is correct
import "./Wishlist.css"; // Assuming your CSS is here
import { Link } from "react-router-dom";

// Import react-toastify components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify

axios.defaults.withCredentials = true;

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/wishlist");
      setWishlist(res.data.userWishlist?.products || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      // Optional: Show an error toast if fetching fails
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/wishlist/${productId}`);
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
      window.dispatchEvent(new Event("wishlistUpdated"));
      toast.success("Product removed from wishlist!"); // Success toast
    } catch (err) {
      console.error("Error removing product:", err);
      toast.error("Failed to remove product. Please try again."); // Error toast
    }
  };

 


  const handleAddToCart = async (productId) => {
    try {
      await axios.post("http://localhost:3000/api/v1/cart", { productId });
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Added to cart!"); // Replaced alert with toast
    } catch (err) {
      console.error("Error adding to cart:", err); // Log error for debugging
      // Check for specific error messages from your backend for better user feedback
      if (err.response && err.response.status === 401) { // Example: assuming 401 for not logged in
        toast.error("Please log in to add items to cart.");
      } else {
        toast.error("Failed to add to cart. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchWishlist();

    // Optional: Listen for wishlist updates from other parts of the app
    // This could trigger a re-fetch or simply update a counter if you have one
    const handleWishlistUpdate = () => {
      fetchWishlist(); // Re-fetch the wishlist to ensure it's fresh
    };
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []); // Empty dependency array means this runs once on mount

  if (!wishlist.length) {
    return (
      <>
        {/* ToastContainer placed here ensures it's available */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" // Or "light" or "colored"
        />
        <div className="container text-center py-5">
          <h3>Your wishlist is empty.</h3>
          <Link to="/products" className="btn btn-dark mt-3">
            Browse Products
          </Link>
        </div>
        <HelpSection />
      </>
    );
  }

  return (
    <>
      {/* ToastContainer must be rendered somewhere in your app, often near the root */}
      <ToastContainer
        position="top-right"
        autoClose={3000} // Close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Matches your site's theme
      />

      <div className="container-fluid my-4 px-5">
        <div className="row">
          <div className="col-lg-9">
            <h2 className="mb-4">My Wishlist</h2>
           

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
              {wishlist.map((product) => (
                <div className="col" key={product._id}>
                  <div className="card product-card h-100 position-relative">
                    <button
                      className="btn text-danger position-absolute top-0 end-0 m-2"
                      onClick={() => handleRemove(product._id)}
                      title="Remove from Wishlist"
                    >
                      <i className="bi bi-trash"></i>
                    </button>

                    <Link to={`/product/${product._id}`}> {/* Make product image/title clickable */}
                      <img
                        src={
                          product.images?.[0]?.url ||
                          "https://via.placeholder.com/300"
                        }
                        className="card-img-top"
                        alt={product.name}
                      />
                    </Link>

                    <div className="card-body d-flex flex-column">
                      <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                        <h5 className="card-title">{product.name}</h5>
                      </Link>
                      <p className="fw-bold">$ {product.price}</p>

                      <div className="mt-auto d-flex justify-content-end">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddToCart(product._id)}
                        >
                          <i className="bi bi-cart-plus"></i> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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