const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.API_SECRET_KEY;
const users = require("../models/User.model");
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Authentication required" });
    jwt.verify(token, SECRET_KEY, async (error, decodedToken) => {
      if (error) {
        console.error(error);
        return res.status(401).json({ message: "Failed authentication" });
      }
      const user = await users.findOne({ _id: decodedToken.id });
      req.user = user;
      return next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access forbidden" });
    }
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const isVerified = (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ message: "Authentication required" });
  if (!req.user.isVerified)
    return res.status(403).json({ message: "Verification required" });
  return next();
};
module.exports = {
  isAuth,
  isAdmin,
  isVerified,
};
