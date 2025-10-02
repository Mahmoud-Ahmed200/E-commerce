require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
// Middlewares
app.use(express.json());
app.use(cookieParser());
const { isAuth,isVerified } = require("./src/middleware/auth.middleware");
// Routes
const authRouter = require("./src/routes/auth.router");
// End Points
app.use("/auth", authRouter);
// Test
app.get("/", isAuth,isVerified,async (req, res) => {
  return res.status(200).json({ message: "TEST" });
});
module.exports = app;
