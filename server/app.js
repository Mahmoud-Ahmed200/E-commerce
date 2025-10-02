require("dotenv").config();
const express = require("express");
const app = express();
// Routes
const authRouter = require("./src/routes/auth.router");
// Middlewares
app.use(express.json());
// End Points
app.use("/auth", authRouter);
app.get("/", async (req, res) => {
  return res.status(200).json({ message: "TEST" });
});
module.exports = app;
