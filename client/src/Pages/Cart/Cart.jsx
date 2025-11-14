import { useState, useEffect } from "react";
import axios from "axios";
import HelpSection from "./Help.jsx";
import "./Cart.css";

axios.defaults.withCredentials = true;

function CartPage() {
  const [cart, setCart] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);


  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/cart");
      setCart(response.data.userCart);
      setCartTotal(response.data.cartTotal);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);


  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (processing) return;
    if (newQuantity < 1) return handleDeleteItem(productId);

    try {
      setProcessing(true);
      await axios.put(
        `http://localhost:3000/api/v1/cart/product/${productId}`,
        {
          quantity: newQuantity,
        }
      );
      await fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setProcessing(false);
    }
  };


  const handleDeleteItem = async (productId) => {
    if (processing) return;
    try {
      setProcessing(true);
      await axios.delete(
        `http://localhost:3000/api/v1/cart/product/${productId}`
      );
      await fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setProcessing(false);
    }
  };


  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) return;
    try {
      setProcessing(true);
      await axios.delete("http://localhost:3000/api/v1/cart");
      setCart({ items: [] });
      setCartTotal(0);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <section className="cart p-5 text-center">
        <h3>Loading your cart...</h3>
      </section>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <>
        <section className="cart p-5 text-center">
          <h3>Your cart is empty.</h3>
          <button
            className="btn btn-dark mt-3"
            onClick={() => (window.location.href = "/products")}
          >
            Go Shopping
          </button>
        </section>
        <HelpSection />
      </>
    );
  }

  return (
    <>
      <section className="cart p-5">
        <div className="container-fluid">
          <div className="row gy-4 align-items-start">
        
            <div className="col-lg-8">
              <div className="p-4 h-100 bg-white shadow-sm rounded-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3>My cart ({cart.items.length} items)</h3>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleClearCart}
                    disabled={processing}
                  >
                    Clear Cart
                  </button>
                </div>
                <hr />

                {cart.items.map((item) => (
                  <div key={item.product._id}>
                    <div className="d-flex flex-column flex-sm-row align-items-center mb-4">
                      <img
                        src={
                          item.product.image || item.product.images?.[0]?.url
                        }
                        className="img-thumbnail me-sm-4 mb-3 mb-sm-0"
                        alt={item.product.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />

                      <div className="flex-grow-1 text-center text-sm-start mb-3 mb-sm-0">
                        <h5 className="mb-1">{item.product.name}</h5>
                        <p className="mb-0 text-muted">
                          EGP {item.product.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="d-flex align-items-center">
                        <div
                          className="input-group input-group-sm"
                          style={{ width: "100px" }}
                        >
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            disabled={processing}
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product._id,
                                item.quantity - 1
                              )
                            }
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            readOnly
                            className="form-control text-center bg-light"
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            disabled={processing}
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product._id,
                                item.quantity + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>

                        <p className="mb-0 mx-3 fw-semibold">
                          EGP{" "}
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString()}
                        </p>

                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => handleDeleteItem(item.product._id)}
                          disabled={processing}
                        >
                          <i className="bi bi-trash3 fs-5"></i>
                        </button>
                      </div>
                    </div>
                    <hr className="my-3" />
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-4">
              <div className="p-4 h-100 bg-white shadow-sm rounded-4">
                <h3 className="mb-4">Order Summary</h3>
                <hr className="my-3" />
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>EGP {cartTotal.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <span>Delivery</span>
                  <span>FREE</span>
                </div>

                <hr className="my-3" />
                <div className="d-flex justify-content-between mb-4">
                  <h5>Total</h5>
                  <h5>EGP {cartTotal.toLocaleString()}</h5>
                </div>

                <button
                  className="btn btn-lg btn-checkout w-100 text-white"
                  disabled={processing}
                  onClick={() => alert("Proceeding to checkout...")}
                >
                  Checkout
                </button>

                <p className="text-center text-muted small mb-0 mt-2">
                  <i className="fas fa-lock me-1"></i> Secure Checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HelpSection />
    </>
  );
}

export default CartPage;
