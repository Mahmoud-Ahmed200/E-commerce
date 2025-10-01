const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const users = require("../models/User.model");
const generateEmailVerficationToken = async function (user) {
  const token = crypto.randomBytes(32).toString("hex");
  user.verifyToken = crypto.createHash("sha256").update(token).digest("hex");
  user.verifyTokenExpires = Date.now() + 1000 * 60 * 60;
  await user.save();
};
const generatePasswordResetToken = async function (user) {
  const token = crypto.randomBytes(32).toString("hex");
  console.log(`ff ${token}`);
  user.passwordReset = crypto.createHash("sha256").update(token).digest("hex");
  user.passwordResetExpires = Date.now() + 1000 * 60 * 60;
  await user.save();
};
const generateToken = function (user) {
  return jwt.sign({ user }, "Secret Key for now", {
    expiresIn: "1day",
  });
};
const signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const userCheck = await users.findOne({ email });
    if (userCheck) {
      return res.status(409).json({ message: "User already registered" });
    }
    const user = await users.create({ email, username, password });
    await generateEmailVerficationToken(user);
    user.password = undefined;
    return res.status(201).json({
      message: "User signed up successfully",
      user,
    });
  } catch (error) {
    console.error("Error while signing up", error);
    return res.status(500).json({ error: error.message });
  }
};
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    user.password = undefined;
    const token = generateToken(user);
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 });
    return res.status(200).json({
      message: "user signed in successfully",
      user,
    });
  } catch (error) {
    console.error("Error while signing in", error);
    return res.status(500).json({ error: error.message });
  }
};
const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    console.error("error while signing out", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const validateEmail = async (req, res) => {
  const { token } = req.query;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
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
  return res.status(200).json({ message: "User verified successfully", user });
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await users.findOne({ email });
    if (!email || !user) {
      return res.status(404).json({ message: "Invalid email" });
    }
    await generatePasswordResetToken(user);
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
    const { token } = req.query;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await users.findOne({ passwordReset: hashedToken });
    if (!token || !user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (user.passwordResetExpires < Date.now()) {
      return res.status(400).json({ message: "Expired token" });
    }
    if (!newPassword || !newPasswordConfirmation) {
      return res.status(404).json({ message: "Invalid Password" });
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
  validateEmail,
  forgotPassword,
  resetPassword,
};
