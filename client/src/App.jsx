import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-bootstrap";
import "./index.css";
import Home from "./Pages/Home.jsx";
import Products from "./Pages/Products.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Account from "./Pages/Account/Account.jsx";
import About from "./Pages/about/about.jsx";
import Contact from "./Pages/contact/contact.jsx";
import SettingsLayout from "./Pages/Account/SettingsLayout.jsx";
import Addresses from "./Pages/Account/Addresses.jsx";
import Wallet from "./Pages/Account/Wallet.jsx";
import Login from "./Pages/LogingIn/Login.jsx";
import SignUp from "./Pages/LogingIn/Signup.jsx";
import ForgetPassword from "./Pages/LogingIn/forgetpassword.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import WishlistPage from "./Pages/Wishlist/Wishlist.jsx";
import OrdersPage from "./Pages/Orders/Orders.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import "./Shared/Navbar.css";
import "./Shared/Footer.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Shared/Navbar.jsx";
import Footer from "./Shared/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./Shared/ScrollToTop";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/user/profile"
        );
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
        console.log(error)
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/AccountSettings" element={<SettingsLayout />}>
          <Route
            path="/AccountSettings/Account"
            element={<Account user={user} setUser={setUser} />}
          />
          <Route path="/AccountSettings/Addresses" element={<Addresses />} />
          <Route path="/AccountSettings/Wallet" element={<Wallet />} />
        </Route>

        <Route path="/Login" element={<Login setUser={setUser} />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/MyWishlist" element={<WishlistPage />} />
        <Route path="/MyOrders" element={<OrdersPage />} />
        <Route path="/not-found" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
