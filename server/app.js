require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
// Middlewares
app.use(express.json());
app.use(cookieParser());
const { isAuth, isVerified } = require("./src/middleware/auth.middleware");
// Routes
const authRouter = require("./src/routes/auth.router");
const userRouter = require("./src/routes/user.router");
const productRouter = require("./src/routes/product.router");
const cartRouter = require("./src/routes/cart.router");
const wishlistRouter = require("./src/routes/wishlist.router");
// End Points
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", isAuth, userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", isAuth, cartRouter);
app.use("/api/v1/wishlist", isAuth, wishlistRouter);

module.exports = app;
