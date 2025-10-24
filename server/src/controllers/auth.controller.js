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
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await users.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    user.password = undefined; //
    user.verifyToken = undefined; //
    user.passwordReset = undefined; //
    const token = tokenHandler.generateJwtToken({ id: user._id });
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
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
  validateEmail,
  forgotPassword,
  resetPassword,
};
