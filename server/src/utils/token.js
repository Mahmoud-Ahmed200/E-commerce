const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const RefreshToken = require('../models/refreshToken.model');

const API_SECRET_KEY = process.env.API_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

const generateTokens = async (userId, ipAddress) => {
  // Access token (short-lived)
  const accessToken = jwt.sign(
    { id: userId }, 
    API_SECRET_KEY, 
    { expiresIn: '15m' }
  );

  // Refresh token (long-lived)
  const refreshToken = jwt.sign(
    { id: userId }, 
    REFRESH_SECRET_KEY, 
    { expiresIn: '7d' }
  );

  await RefreshToken.create({
    token: crypto.createHash('sha256').update(refreshToken).digest('hex'),
    user: userId,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    createdByIp: ipAddress
  });

  return { accessToken, refreshToken };
};

const refreshAccessToken = async (refreshToken, ipAddress) => {
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);

    const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
    
    const storedToken = await RefreshToken.findOne({ 
      token: hashedToken,
      user: decoded.id 
    });

    if (!storedToken || !storedToken.isActive) {
      throw new Error('Invalid refresh token');
    }

    storedToken.revokedAt = Date.now();
    storedToken.revokedByIp = ipAddress;
    await storedToken.save();

    return await generateTokens(decoded.id, ipAddress);
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

const revokeToken = async (refreshToken, ipAddress) => {
  const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
  
  const token = await RefreshToken.findOne({ token: hashedToken });
  
  if (!token || !token.isActive) {
    throw new Error('Invalid token');
  }

  token.revokedAt = Date.now();
  token.revokedByIp = ipAddress;
  await token.save();
};

module.exports = {
  generateTokens,
  refreshAccessToken,
  revokeToken,
  generateCryptoToken: () => crypto.randomBytes(32).toString("hex"),
  generateHashedCryptoToken: (token) => 
    crypto.createHash("sha256").update(token).digest("hex"),
  createCryptoToken: () => {
    const plainToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(plainToken).digest("hex");
    const expiresAt = Date.now() + 1000 * 60 * 60; 
    return { plainToken, hashedToken, expiresAt };
  }
};

