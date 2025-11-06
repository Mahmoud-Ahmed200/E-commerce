import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-bootstrap';
import './index.css'
import Home from './Pages/Home.jsx';
import Products from './Pages/Products.jsx';
import ProductDetails from './Pages/ProductDetails.jsx';
import Account from './Pages/Account/Account.jsx';
import About from './Pages/about/about.jsx';
import Contact from './Pages/contact/contact.jsx';
import SettingsLayout from './Pages/Account/SettingsLayout.jsx';
import Addresses from './Pages/Account/Addresses.jsx';
import Wallet from './Pages/Account/Wallet.jsx';
import Login from './Pages/LogingIn/Login.jsx';
import SignUp from './Pages/LogingIn/Signup.jsx';
import ForgetPassword from './Pages/LogingIn/forgetpassword.jsx';
import Cart from './Pages/Cart/Cart.jsx'; 
import WishlistPage from './Pages/Wishlist/Wishlist.jsx';
import OrdersPage from './Pages/Orders/Orders.jsx';
import './Shared/Navbar.css'
import './Shared/Footer.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar  from './Shared/Navbar.jsx';
import Footer  from './Shared/Footer.jsx';
import { Routes , Route } from 'react-router-dom';
import ScrollToTop from './Shared/ScrollToTop';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/ProductDetails" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

          <Route path="/AccountSettings" element={<SettingsLayout />}>
            <Route path='/AccountSettings/Account' element={<Account />} />
            <Route path='/AccountSettings/Addresses' element={<Addresses />} />
            <Route path='/AccountSettings/Wallet' element={<Wallet />} />
          </Route>

        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/MyWishlist" element={<WishlistPage />} />
        <Route path="/MyOrders" element={<OrdersPage />} />    
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
)
