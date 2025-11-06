const jwt = require("jsonwebtoken");
const users = require("../models/user.model");

const API_SECRET_KEY = process.env.API_SECRET_KEY;

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ 
        message: "Authentication required. Please sign in." 
      });
    }

    const decoded = jwt.verify(token, API_SECRET_KEY);

    const user = await users.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ 
        message: "User not found. Please sign in again." 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: "Access token expired. Please refresh your token.",
        code: "TOKEN_EXPIRED"
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: "Invalid token. Please sign in again." 
      });
    }

    console.error("Auth middleware error:", error);
    return res.status(500).json({ 
      message: "Internal server error" 
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        message: "Authentication required" 
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ 
        message: "Admin access required. Insufficient permissions." 
      });
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({ 
      message: "Internal server error" 
    });
  }
};

const isVerified = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        message: "Authentication required" 
      });
    }

    if (!req.user.isVerified) {
      return res.status(403).json({ 
        message: "Email verification required. Please verify your email to continue.",
        code: "EMAIL_NOT_VERIFIED"
      });
    }

    next();
  } catch (error) {
    console.error("Verification middleware error:", error);
    return res.status(500).json({ 
      message: "Internal server error" 
    });
  }
};

// Optional: Middleware to check if user is authenticated (doesn't fail if not)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (token) {
      try {
        const decoded = jwt.verify(token, API_SECRET_KEY);
        const user = await users.findById(decoded.id);
        if (user) {
          req.user = user;
        }
      } catch (error) {
        console.log("Optional auth - token invalid:", error.message);
      }
    }

    next();
  } catch (error) {
    console.error("Optional auth middleware error:", error);
    next(); 
  }
};

module.exports = {
  isAuth,
  isAdmin,
  isVerified,
  optionalAuth
};