import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import Swal from "sweetalert2";

function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    paymentMethod: "card",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (orderSuccess) {
      const timer = setTimeout(() => {
        navigate("/MyOrders");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [orderSuccess]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/v1/cart", {
        credentials: "include",
      });
      const data = await response.json();
      setCart(data.userCart);
      setCartTotal(data.cartTotal);
    } catch (error) {
      alert("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Payment required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  if (processing) return;

  try {
    setProcessing(true);

    const orderData = {
      shippingAddress: {
        street: formData.street.trim(),
        city: formData.city.trim(),
        phone: formData.phone.trim(),
        state: formData.state.trim() || undefined,
        zipCode: formData.zipCode.trim() || undefined,
        country: formData.country.trim() || undefined,
      },
      paymentMethod: formData.paymentMethod,
    };

    const response = await fetch("http://localhost:3000/api/v1/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    setOrderId(data.order._id);
    window.dispatchEvent(new Event("cartUpdated"));

    Swal.fire({
      title: "Success!",
      text: `Your order has been placed successfully.`,
      icon: "success",
      confirmButtonText: "OK",
    });

  } 
  catch (error) {
     Swal.fire({
      title: "Success!",
      text: `Your order has been placed successfully.`,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/");
    });
  }
  finally {
    setProcessing(false);
  }
};

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-warning" role="status"></div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="container py-5">
        <div className="amazon-box p-5 text-center">
          <h2 className="text-success mb-3">Order Placed Successfully!</h2>
          <p>You will be redirected automatically...</p>

          <h5 className="mt-4">Order ID:</h5>
          <div className="border rounded p-2 bg-light fw-bold">{orderId}</div>

          <div className="mt-4">
            <button
              className="btn btn-warning w-100 mb-2"
              onClick={() => (navigate("/"))}
            >
              View My Orders Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container text-center py-5">
        <div className="amazon-box p-5">
          <h3>Your cart is empty</h3>
          <button
            className="btn btn-warning mt-3"
            onClick={() => (navigate("/"))}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Checkout</h2>

      <div className="row g-4">
        {/* LEFT */}
        <div className="col-lg-8">
          <div className="amazon-box mb-4 p-4">
            <h4 className="mb-3">Shipping Address</h4>

            <div className="mb-3">
              <label className="form-label">Street *</label>
              <input
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className={`form-control ${errors.street && "is-invalid"}`}
              />
              {errors.street && <div className="invalid-feedback">{errors.street}</div>}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">City *</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`form-control ${errors.city && "is-invalid"}`}
                />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">State</label>
                <input name="state" value={formData.state} onChange={handleInputChange} className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Zip Code</label>
                <input name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="form-control" />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Country</label>
                <input name="country" value={formData.country} onChange={handleInputChange} className="form-control" />
              </div>
            </div>

            <div>
              <label className="form-label">Phone *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`form-control ${errors.phone && "is-invalid"}`}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
          </div>

          <div className="amazon-box p-4">
            <h4 className="mb-3">Payment Method</h4>

            {["card", "paypal", "cash"].map((method, i) => (
              <div key={i} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={handleInputChange}
                />
                <label className="form-check-label text-capitalize">{method}</label>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-4">
          <div className="amazon-box p-4 position-sticky" style={{ top: "20px" }}>
            <h4>Order Summary</h4>
            <hr />

            {cart.items.map((item) => (
              <div key={item.product._id} className="d-flex mb-3">
                <img
                  src={item.product.image || item.product.images?.[0]?.url}
                  className="me-3 rounded"
                  width="70"
                  height="70"
                />
                <div>
                  <div className="fw-bold">{item.product.name}</div>
                  <div className="small">
                    {item.quantity} × EGP {item.product.price}
                  </div>
                </div>
              </div>
            ))}

            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>EGP {cartTotal}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={processing}
              className="btn btn-lg btn-placeorder w-100 text-white"
            >
              {processing ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
