const users = require("../models/user.model");
const tokenHandler = require("../utils/token");

const signUp = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userCheck = await users.findOne({ email });
    if (userCheck) {
      return res.status(409).json({ message: "User already registered" });
    }

    const user = await users.create({ email, fullName, password });

    const { plainToken, hashedToken, expiresAt } =
      tokenHandler.createCryptoToken();

    const link = `http://localhost:3000/auth/verifyemail?token=${plainToken}`;
    console.log(link); // for test only
    user.verifyToken = hashedToken;
    user.verifyTokenExpires = expiresAt;

    await user.save();
    user.verifyToken = undefined;
    user.password = undefined;
    // await emailService.sendVerificationEmail(user.email, user.fullName, link);
    return res.status(201).json({
      message: "User signed up successfully",
      user,
    });
  } catch (error) {
    console.error("Error while signing up", error);
    return res.status(500).json({ error: error.message });
  }
};

// src/controllers/auth.controller.js (UPDATE signIn)
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("test");
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await users.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate both tokens
    const ipAddress = req.ip;
    const { accessToken, refreshToken } = await tokenHandler.generateTokens(
      user._id,
      ipAddress
    );

    // Set tokens in cookies
    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000, // 15 minutes
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    user.lastLogin = Date.now();
    await user.save();
    user.password = undefined;

    return res.status(200).json({
      message: "User signed in successfully",
      user,
      accessToken, // Also send in response for client storage if needed
    });
  } catch (error) {
    console.error("Error while signing in", error);
    return res.status(500).json({ error: error.message });
  }
};

// New refresh endpoint
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const ipAddress = req.ip;
    const { accessToken, refreshToken: newRefreshToken } =
      await tokenHandler.refreshAccessToken(refreshToken, ipAddress);

    // Set new tokens
    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.cookie("refreshToken", newRefreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const signOut = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(200).json({ message: "No active session" });
    }
    res.clearCookie("token", {
      httpOnly: true,
    });
    return res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    console.error("error while signing out", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const validateEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const hashedToken = tokenHandler.generateHashedCryptoToken(token);
    const user = await users.findOne({ verifyToken: hashedToken });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (user.verifyTokenExpires < Date.now()) {
      return res.status(401).json({ message: "Expired token" });
    }
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;
    user.isVerified = true;
    await user.save();
    return res
      .status(200)
      .json({ message: "User verified successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await users.findOne({ email });
    if (!email || !user) {
      return res.status(404).json({ message: "Invalid email" });
    }
    const { plainToken, hashedToken, expiresAt } =
      tokenHandler.createCryptoToken();
    const link = `http://localhost:3000/auth/resetpassword?token=${plainToken}`;
    console.log(link);
    user.passwordReset = hashedToken;
    user.passwordResetExpires = expiresAt;
    // await emailService.passwordResetEmail(user.email, user.fullName, link);
    await user.save();
    user.passwordReset = undefined;
    return res
      .status(200)
      .json({ message: "Password reset link has been sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { newPassword, newPasswordConfirmation } = req.body;
    if (!newPassword || !newPasswordConfirmation) {
      return res.status(404).json({ message: "Invalid Password" });
    }
    const { token } = req.query;
    const hashedToken = tokenHandler.generateHashedCryptoToken(token);
    const user = await users.findOne({ passwordReset: hashedToken });
    if (!token || !user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (user.passwordResetExpires < Date.now()) {
      return res.status(400).json({ message: "Expired token" });
    }
    if (newPassword !== newPasswordConfirmation) {
      return res.status(400).json({ message: "Password not match" });
    }
    user.password = newPassword;
    user.passwordReset = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "Password reseted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  signUp,
  signIn,
  signOut,
  refreshToken,
  validateEmail,
  forgotPassword,
  resetPassword,
};
