import "./Products.css";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
axios.defaults.withCredentials = true;

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sortBy: searchParams.get("sortBy") || "newest",
    page: parseInt(searchParams.get("page")) || 1,
    limit: 12,
  });

  const search = searchParams.get("search") || "";

  const [priceInputs, setPriceInputs] = useState({
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.sortBy && filters.sortBy !== "newest")
      params.set("sortBy", filters.sortBy);
    if (filters.page > 1) params.set("page", filters.page);
    if (search) params.set("search", search);
    setSearchParams(params);
  }, [filters, search, setSearchParams]);

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const sortBy = searchParams.get("sortBy") || "newest";
    const page = parseInt(searchParams.get("page")) || 1;

    setFilters((prev) => ({
      ...prev,
      category,
      minPrice,
      maxPrice,
      sortBy,
      page,
    }));
    setPriceInputs({ minPrice, maxPrice });
  }, [searchParams]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/wishlist");
      setWishlist(res.data.userWishlist?.products || []);
    } catch {
      setWishlist([]);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (search) params.append("search", search);
      params.append("sortBy", filters.sortBy);
      params.append("page", filters.page);
      params.append("limit", filters.limit);

      const res = await axios.get(
        `http://localhost:3000/api/v1/product?${params.toString()}`
      );

      setProducts(res.data.products || []);
      setPagination(
        res.data.pagination || { total: 0, page: 1, limit: 12, totalPages: 1 }
      );

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, search]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleToggleWishlist = async (productId) => {
    try {
      const isInWishlist = wishlist.some((p) => p._id === productId);
      if (isInWishlist) {
        await axios.delete(
          `http://localhost:3000/api/v1/wishlist/${productId}`
        );
        setWishlist((prev) => prev.filter((p) => p._id !== productId));
      } else {
        await axios.post("http://localhost:3000/api/v1/wishlist", {
          productId,
        });
        setWishlist((prev) => [...prev, { _id: productId }]);
      }
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch {
      alert("Please log in to use wishlist.");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post("http://localhost:3000/api/v1/cart", { productId });
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Added to cart!");
    } catch {
       toast.error("Please log in to add to cart.");
    }
  };

  const handleCategoryChange = (category) => {
    scrollToTop();
    setFilters((prev) => ({
      ...prev,
      category: prev.category === category ? "" : category,
      page: 1,
    }));
  };

  const handleSortChange = (e) => {
    scrollToTop();
    setFilters((prev) => ({
      ...prev,
      sortBy: e.target.value,
      page: 1,
    }));
  };

  const handlePriceFilter = () => {
    scrollToTop();
    setFilters((prev) => ({
      ...prev,
      minPrice: priceInputs.minPrice,
      maxPrice: priceInputs.maxPrice,
      page: 1,
    }));
  };

  const clearPriceFilter = () => {
    scrollToTop();
    setPriceInputs({ minPrice: "", maxPrice: "" });
    setFilters((prev) => ({
      ...prev,
      minPrice: "",
      maxPrice: "",
      page: 1,
    }));
  };

  const clearAllFilters = () => {
    scrollToTop();
    setPriceInputs({ minPrice: "", maxPrice: "" });
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "newest",
      page: 1,
      limit: 12,
    });
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    scrollToTop();
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const hasActiveFilters =
    filters.category || filters.minPrice || filters.maxPrice || search;

  return (
    <>
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
    <div className="page-container">
      <div className="sidebar d-none d-lg-block">
        <div className="browse-section">
          <h3 className="fs-5 mb-3">Browse by Category</h3>
          <ul className="list-unstyled">
            <li className="mb-2">
              <a
                href="#"
                className={`text-decoration-none ${
                  !filters.category && !search ? "active fw-bold" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  clearAllFilters();
                }}
              >
                All Products
              </a>
            </li>
            {["Mobile", "Laptop", "Tablet", "Computer", "TV"].map((cat) => (
              <li key={cat} className="mb-2">
                <a
                  href="#"
                  className={`text-decoration-none ${
                    filters.category === cat ? "active fw-bold" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryChange(cat);
                  }}
                >
                  {cat}s
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="filter-section mt-4">
          <h3 className="fs-5 mb-3">Filter by Price</h3>
          <div className="price-filter">
            <div className="price-inputs d-flex align-items-center gap-2 mb-2">
              <input
                type="number"
                placeholder="Min"
                className="form-control form-control-sm"
                value={priceInputs.minPrice}
                onChange={(e) =>
                  setPriceInputs((prev) => ({
                    ...prev,
                    minPrice: e.target.value,
                  }))
                }
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                className="form-control form-control-sm"
                value={priceInputs.maxPrice}
                onChange={(e) =>
                  setPriceInputs((prev) => ({
                    ...prev,
                    maxPrice: e.target.value,
                  }))
                }
              />
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-primary flex-grow-1"
                onClick={handlePriceFilter}
              >
                Apply
              </button>
              {(filters.minPrice || filters.maxPrice) && (
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={clearPriceFilter}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-3">
            <button
              className="btn btn-sm btn-outline-danger w-100"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      <main className="main-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <div>
            <h1 className="fs-2 mb-0">
              {search
                ? `Search Results for "${search}"`
                : filters.category
                ? `${filters.category}s`
                : "All Products"}
            </h1>
            <p className="num-of-products mb-0 text-muted">
              {pagination.total} product{pagination.total !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="products-header d-flex gap-3 align-items-center flex-wrap">
            <select
              name="sort-by"
              id="sort-by"
              className="form-select"
              value={filters.sortBy}
              onChange={handleSortChange}
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : !products.length ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox fs-1 text-muted"></i>
            <p className="mt-3 text-muted">
              No products found matching your criteria.
            </p>
            {hasActiveFilters && (
              <button className="btn btn-primary mt-2" onClick={clearAllFilters}>
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
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
                  </Link>

                  <div className="card-body p-3">
                    <h4 className="card-title fs-6">{product.name}</h4>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold">
                        ${product.price?.toLocaleString()}
                      </span>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleToggleWishlist(product._id)}
                      >
                        <i
                          className={
                            wishlist.some((p) => p._id === product._id)
                              ? "bi bi-heart-fill text-danger"
                              : "bi bi-heart"
                          }
                        ></i>
                      </button>
                    </div>

                    <button
                      className="btn btn-primary w-100 btn-sm"
                      onClick={() => handleAddToCart(product._id)}
                    >
                      + Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                <button
                  className="btn btn-outline-primary"
                  disabled={filters.page === 1}
                  onClick={() => handlePageChange(filters.page - 1)}
                >
                  <i className="bi bi-chevron-left"></i> Previous
                </button>

                <div className="d-flex align-items-center gap-2">
                  {filters.page > 2 && (
                    <>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </button>
                      {filters.page > 3 && <span>...</span>}
                    </>
                  )}

                  {filters.page > 1 && (
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handlePageChange(filters.page - 1)}
                    >
                      {filters.page - 1}
                    </button>
                  )}

                  <button className="btn btn-primary">{filters.page}</button>

                  {filters.page < pagination.totalPages && (
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handlePageChange(filters.page + 1)}
                    >
                      {filters.page + 1}
                    </button>
                  )}
                  {filters.page < pagination.totalPages - 1 && (
                    <>
                      {filters.page < pagination.totalPages - 2 && <span>...</span>}
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handlePageChange(pagination.totalPages)}
                      >
                        {pagination.totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  className="btn btn-outline-primary"
                  disabled={filters.page === pagination.totalPages}
                  onClick={() => handlePageChange(filters.page + 1)}
                >
                  Next <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
    </>
  );
}

export default Products;
