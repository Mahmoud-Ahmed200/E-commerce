const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const API_SECRET_KEY = process.env.API_SECRET_KEY;

const generateCryptoToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
const generateHashedCryptoToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
const generateJwtToken = (user) => {
  return jwt.sign({ user }, API_SECRET_KEY, {
    expiresIn: "1d",
  });
};
const calculateExpiryTime = (minutes) => {
  return Date.now() + 1000 * minutes * 60;
};
const createCryptoToken = () => {
  const plainToken = generateCryptoToken();
  const hashedToken = generateHashedCryptoToken(plainToken);
  const expiresAt = calculateExpiryTime(60);
  return {
    plainToken,
    hashedToken,
    expiresAt,
  };
};
module.exports = {
  generateCryptoToken,
  generateHashedCryptoToken,
  generateJwtToken,
  createCryptoToken,
};
