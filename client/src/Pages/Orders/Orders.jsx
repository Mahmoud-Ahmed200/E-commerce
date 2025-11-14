import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Wishlist/SideBar.jsx";
import HelpSection from "../Cart/Help.jsx";
import "./Orders.css";

axios.defaults.withCredentials = true;

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [processing, setProcessing] = useState(false);

  // ✅ Fetch all user orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/v1/orders?page=${page}&limit=5`
      );

      setOrders(res.data.orders || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel Order
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      setProcessing(true);
      await axios.put(`http://localhost:3000/api/v1/orders/${orderId}/cancel`);
      alert("Order cancelled successfully!");
      fetchOrders();
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert(
        err.response?.data?.message ||
          "Failed to cancel order. Try again later."
      );
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  // ✅ Pagination controls
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="p-5 text-center">
        <h4>Loading your orders...</h4>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-5 text-center text-danger">
        <h4>{error}</h4>
      </section>
    );
  }

  if (!orders.length) {
    return (
      <>
        <section className="p-5 text-center">
          <h3>No orders found.</h3>
          <Link to="/products" className="btn btn-dark mt-3">
            Browse Products
          </Link>
        </section>
        <HelpSection />
      </>
    );
  }

  return (
    <>
      <div className="container-fluid my-4 px-5">
        <div className="row">
          {/* Orders List */}
          <div className="col-lg-9">
            <div className="dropdown d-lg-none mb-4">
              <button
                className="btn btn-outline-dark dropdown-toggle w-100"
                type="button"
                id="mobileMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-list me-2"></i>
                My Account Menu
              </button>
              <ul
                className="dropdown-menu w-100 fade"
                aria-labelledby="mobileMenuButton"
              >
                <li>
                  <Link
                    to="/AccountSettings/Account"
                    className="dropdown-item d-flex justify-content-between align-items-center"
                  >
                    <span>My Account</span>
                    <i className="bi bi-person"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/MyOrders"
                    className="dropdown-item d-flex justify-content-between align-items-center active"
                  >
                    <span>My Orders</span>
                    <i className="bi bi-box-seam"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/MyWishlist"
                    className="dropdown-item d-flex justify-content-between align-items-center"
                  >
                    <span>My Wishlist</span>
                    <i className="bi bi-heart"></i>
                  </Link>
                </li>
              </ul>
            </div>

            <h2 className="mb-4 text-lg-start text-center">My Orders</h2>

            <div className="order-list">
              {orders.map((order) => (
                <div className="card order-card mb-4" key={order._id}>
                  {/* Header */}
                  <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
                    <div className="me-3 mb-2 mb-md-0">
                      <strong className="d-block">Order #{order._id}</strong>
                      <small className="text-muted">
                        Placed on:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <strong className="fs-6">
                      Total: EGP {order.totalAmount.toLocaleString()}
                    </strong>
                  </div>

                  {/* Body - Items */}
                  <div className="card-body">
                    {order.items.map((item) => (
                      <div
                        className="d-flex align-items-center mb-3"
                        key={item.product?._id || item.name}
                      >
                        <img
                          src={
                            item.product?.images?.[0]?.url ||
                            item.product?.image ||
                            "https://via.placeholder.com/80"
                          }
                          className="order-product-img"
                          alt={item.product?.name || item.name}
                        />
                        <div className="ms-3 flex-grow-1">
                          <h6 className="mb-0">
                            {item.product?.name || item.name}
                          </h6>
                          <small className="text-muted">
                            Qty: {item.quantity}
                          </small>
                        </div>
                        <span className="ms-3 fw-bold">
                          EGP {item.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="card-footer d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                      <strong>Status: </strong>
                      <span
                        className={`badge ${
                          order.status === "delivered"
                            ? "bg-success"
                            : order.status === "cancelled"
                            ? "bg-danger"
                            : order.status === "shipping"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>

                    <div className="d-flex gap-2">
                      {["pending", "processing"].includes(order.status) && (
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={processing}
                        >
                          Cancel
                        </button>
                      )}

                      <Link
                        to={`/orders/${order._id}`}
                        className="btn btn-dark btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                  <button
                    className="btn btn-outline-primary"
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    <i className="bi bi-chevron-left"></i> Previous
                  </button>

                  <span>
                    Page {page} of {totalPages}
                  </span>

                  <button
                    className="btn btn-outline-primary"
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Next <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-3 d-none d-lg-block">
            <Sidebar />
          </div>
        </div>
      </div>

      <HelpSection />
    </>
  );
}

export default OrdersPage;
