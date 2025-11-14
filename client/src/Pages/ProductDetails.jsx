import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer , toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


axios.defaults.withCredentials = true;

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false); // State for wishlist status

  
  // Function to fetch product details and check wishlist status
  useEffect(() => {
    const fetchProductAndWishlistStatus = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch product details
        const productRes = await axios.get(
          `http://localhost:3000/api/v1/product/${productId}`
        );
        setProduct(productRes.data.product);

        // Check if product is in wishlist
        const wishlistRes = await axios.get("http://localhost:3000/api/v1/wishlist");
        const userWishlistProducts = wishlistRes.data.userWishlist?.products || [];
        const productIsInWishlist = userWishlistProducts.some(
          (item) => item._id === productId
        );
        setIsInWishlist(productIsInWishlist);

      } catch (err) {
        console.error("Error fetching product details or wishlist status:", err);
        setError("Failed to load product details. Please try again.");
        toast.error("Failed to load product details."); // Toast for fetch error
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndWishlistStatus();

    // Listen for global wishlist updates to keep the button status fresh
    const handleWishlistUpdate = () => {
      axios.get("http://localhost:3000/api/v1/wishlist")
        .then(res => {
          const userWishlistProducts = res.data.userWishlist?.products || [];
          setIsInWishlist(userWishlistProducts.some(item => item._id === productId));
        })
        .catch(err => console.error("Error re-fetching wishlist for status update:", err));
    };
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };

  }, [productId]); // Re-run if productId changes

  // Function to handle adding to cart (now using toast)
  const handleAddToCart = async (productId) => {
    try {
      await axios.post("http://localhost:3000/api/v1/cart", { productId });
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Added to cart!"); // Success toast
    } catch (err) {
      console.error("Error adding to cart:", err);
      if (err.response && err.response.status === 401) {
        toast.error("Please log in to add items to cart."); // Error toast for login
      } else {
        toast.error("Failed to add to cart. Please try again."); // Generic error toast
      }
    }
  };

  // Function to add product to wishlist (now using toast)
  const handleAddToWishlist = async (productId) => {
    try {
      await axios.post("http://localhost:3000/api/v1/wishlist", { productId });
      setIsInWishlist(true); // Optimistically update local state
      window.dispatchEvent(new Event("wishlistUpdated")); // Dispatch global event
      toast.success("Added to wishlist!"); // Success toast
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      if (err.response && err.response.status === 401) {
        toast.error("Please log in to add items to wishlist."); // Error toast for login
      } else {
        toast.error("Failed to add to wishlist. Please try again."); // Generic error toast
      }
    }
  };

  // Function to remove product from wishlist (now using toast)
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/wishlist/${productId}`);
      setIsInWishlist(false); // Optimistically update local state
      window.dispatchEvent(new Event("wishlistUpdated")); // Dispatch global event
      toast.success("Removed from wishlist succressfully!"); // Success toast
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove from wishlist. Please try again."); // Error toast
    }
  };


  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-5 text-muted">
        <i className="bi bi-inbox fs-1"></i>
        <p className="mt-3">Product not found.</p>
      </div>
    );
  }

  return (
<>
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
    <div className="product-details-container">
      {/* Left side - Gallery */}
      <div className="product-gallery">
        <div className="main-image">
          <img
            src={
              product.images?.[activeImage]?.url ||
              "https://via.placeholder.com/500"
            }
            alt={product.name}
          />
        </div>
        {product.images?.length > 1 && (
          <div className="thumbnail-list">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${index === activeImage ? "active" : ""}`}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={img.url || "https://via.placeholder.com/80"}
                  alt={`${product.name} ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right side - Info */}
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>

        <div className="product-price">
          ${product.price?.toLocaleString() || "N/A"}
        </div>

        {product.averageRating > 0 && (
          <div className="rating text-warning small">
            ⭐ {product.averageRating?.toFixed(1)} ({product.totalReviews || 0}{" "}
            reviews)
          </div>
        )}

        <div className="product-description">
          <h2>Description</h2>
          <p>{product.description || "No description available."}</p>
        </div>

        {product.specifications?.length > 0 && (
          <div className="product-specs">
            <h2>Key Features</h2>
            <ul>
              {product.specifications.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="product-actions">
          <div className="stock-status">
            {product.stock > 0 ? (
              <span className="in-stock">In Stock</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <button
            className="btn btn-primary w-100 btn-sm"
            onClick={() => handleAddToCart(product._id)}
            disabled={product.stock === 0} // Disable if out of stock
          >
            <i className="bi bi-cart-plus me-2"></i> Add To Cart
          </button>

          {/* Dynamic Wishlist Button */}
          <button
            className={`btn btn-outline-${isInWishlist ? "danger" : "secondary"} w-100 btn-sm mt-2`}
            onClick={() =>
              isInWishlist
                ? handleRemoveFromWishlist(product._id)
                : handleAddToWishlist(product._id)
            }
            disabled={product.stock === 0} // You might also disable wishlist if out of stock
          >
            <i className={`bi bi-${isInWishlist ? "heart-fill" : "heart"} me-2`}></i>{" "}
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default ProductDetails;