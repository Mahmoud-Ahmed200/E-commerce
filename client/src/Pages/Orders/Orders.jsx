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

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/v1/orders?page=${page}&limit=5`
      );

      const sorted = res.data.orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setOrders(sorted);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      setProcessing(true);
      await axios.put(`http://localhost:3000/api/v1/orders/${orderId}/cancel`);
      alert("Order cancelled successfully!");
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel order.");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

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
          {/* MAIN */}
          <div className="col-lg-9">
            <h2 className="mb-4">My Orders</h2>

            {orders.map((order, index) => (
              <div
                key={order._id}
                className={`card order-card mb-4 ${
                  index === 0 ? "border-success shadow" : ""
                }`}
              >
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
                  <div>
                    <strong>Order #{order._id}</strong>
                    <br />
                    <small className="text-muted">
                      Placed on: {new Date(order.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <strong>Total: EGP {order.totalAmount}</strong>
                </div>

                <div className="card-body">
                  {order.items.map((item) => (
                    <div
                      key={item.product?._id}
                      className="d-flex align-items-center mb-3"
                    >
                      <img
                        src={
                          item.product?.images?.[0]?.url ||
                          item.product?.image ||
                          "https://via.placeholder.com/80"
                        }
                        className="order-product-img"
                      />
                      <div className="ms-3 flex-grow-1">
                        <h6>{item.product?.name}</h6>
                        <small>Qty: {item.quantity}</small>
                      </div>
                      <span className="fw-bold">EGP {item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <strong>
                    Status:{" "}
                    <span
                      className={`badge ${
                        order.status === "delivered"
                          ? "bg-success"
                          : order.status === "cancelled"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.status}
                    </span>
                  </strong>

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

          {/* SIDEBAR */}
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
