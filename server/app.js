require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// Security Middlewares
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parser Middlewares
app.use(express.json({ limit: "10mb" })); // Add limit
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Rate Limiting
const { apiLimiter } = require("./src/middleware/rateLimiter.middleware");
app.use("/api/", apiLimiter);

// Auth & Validation Middlewares
const { isAuth, isVerified } = require("./src/middleware/auth.middleware");

// Routes
const authRouter = require("./src/routes/auth.router");
const userRouter = require("./src/routes/user.router");
const productRouter = require("./src/routes/product.router");
const cartRouter = require("./src/routes/cart.router");
const wishlistRouter = require("./src/routes/wishlist.router");
const orderRouter = require("./src/routes/order.router");

// API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", isAuth, userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", isAuth, cartRouter);
app.use("/api/v1/wishlist", isAuth, wishlistRouter);
app.use("/api/v1/order", isAuth, orderRouter);

// Handle not found requests
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Global Error Handler
const { errorHandler } = require("./src/middleware/error.middleware");
app.use(errorHandler);

module.exports = app;
