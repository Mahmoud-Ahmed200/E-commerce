import "./Products.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/product");
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading products...</div>;
  }

  return (
    <div className="page-container">
      {/* Sidebar Toggle for Mobile */}
      <button className="filter-toggle d-lg-none" type="button">
        <i className="bi bi-funnel"></i> Filters
      </button>

      {/* Sidebar */}
      <div className="sidebar d-none d-lg-block">
        <div className="browse-section">
          <h3 className="fs-5">Browse by</h3>
          <ul>
            <li>
              <a href="#" className="active">
                All Products
              </a>
            </li>
            <li>
              <a href="#">Mobile</a>
            </li>
            <li>
              <a href="#">Laptops</a>
            </li>
            <li>
              <a href="#">Tablets</a>
            </li>
            <li>
              <a href="#">Computers</a>
            </li>
            <li>
              <a href="#">TV</a>
            </li>
          </ul>
        </div>
        <div className="filter-section">
          <h3 className="fs-5">Filter by</h3>
          <div className="price-filter">
            <h4 className="fs-6">Price</h4>
            <div className="price-inputs">
              <input
                type="text"
                placeholder="$min"
                className="form-control form-control-sm"
              />
              <span>-</span>
              <input
                type="text"
                placeholder="$max"
                className="form-control form-control-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <div>
            <h1 className="fs-2 mb-0">All Products</h1>
            <p className="num-of-products mb-0">{products.length} products</p>
          </div>

          <div className="products-header d-flex gap-3 align-items-center flex-wrap">
            <select name="sort-by" id="sort-by" className="form-select">
              <option value="recommended">Recommended</option>
              <option value="newest">Newest</option>
              <option value="price-low-high">Price (Low to High)</option>
              <option value="price-high-low">Price (High to Low)</option>
              <option value="name-az">Name A-Z</option>
              <option value="name-za">Name Z-A</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products.map((product) => (
            <div className="card h-100" key={product._id}>
              <Link
                to={`/products/${product._id}`}
                className="text-decoration-none"
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
                      <p className="mb-2">${product.price}</p>
                    </div>
                    <div className="rating text-warning small">
                      ⭐ {product.averageRating?.toFixed(1) || 0} (
                      {product.totalReviews || 0})
                    </div>
                  </div>
                  <button className="btn btn-primary w-100">
                    + Add To Cart
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Products;
