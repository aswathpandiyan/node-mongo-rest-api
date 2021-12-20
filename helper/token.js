const jwt = require("jsonwebtoken");

async function generateAccessToken(user_id) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "120s",
    issuer: "clanizon.com",
    audience: user_id.toString(),
  });
}

async function generateRefreshToken(user_id) {
  return jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1y",
    issuer: "clanizon.com",
    audience: user_id.toString(),
  });
}

async function verifyRefreshToken(refreshToken) {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {
  generateAccessToken: generateAccessToken,
  generateRefreshToken: generateRefreshToken,
  verifyRefreshToken: verifyRefreshToken,
};
