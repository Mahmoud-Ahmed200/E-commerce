import './ProductDetails.css';
import iphone16 from "../assets/iphone16.png";


function ProductDetails() {
  return (
    <div className="product-details-container">
      <div className="product-gallery">
        <div className="main-image">
          <img src={iphone16} alt="iPhone 16" />
        </div>
        <div className="thumbnail-list">
          <div className="thumbnail active">
            <img src={iphone16} alt="iPhone 16 front view" />
          </div>
          <div className="thumbnail">
            <img src={iphone16} alt="iPhone 16 back view" />
          </div>
          <div className="thumbnail">
            <img src={iphone16} alt="iPhone 16 side view" />
          </div>
        </div>
      </div>

      <div className="product-info">
        <h1 className="product-title">iPhone 16 Pro Max</h1>
        <div className="product-price">$899.99</div>
        
        <div className="product-description">
          <h2>Description</h2>
          <p>Experience the next evolution of iPhone with the all-new iPhone 16 Pro Max. Featuring the groundbreaking A18 Pro chip, enhanced AI capabilities, and an advanced quad-camera system with revolutionary computational photography.</p>
        </div>

        <div className="product-specs">
          <h2>Key Features</h2>
          <ul>
            <li>6.9-inch ProMotion XDR display with Always-On</li>
            <li>A18 Pro chip with next-gen Neural Engine</li>
            <li>48MP Quad-camera system with 8K video</li>
            <li>Advanced AI features and capabilities</li>
            <li>All-day battery life with fast charging</li>
            <li>5G connectivity with Wi-Fi 7</li>
          </ul>
        </div>

        <div className="product-actions">
          <div className="stock-status">
            <span className="in-stock">Pre-Order Now (Limited Stock)</span>
          </div>
          
          <button className="add-to-cart">
            Pre-Order Now
          </button>
          <button className="add-to-wishlist">
            <i className="bi bi-heart"></i> Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;