const send = require("../helper/response");
const jwt = require("jsonwebtoken");
const log = require("../helper/logger");

async function authenticate(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) {
    return (res.statusCode = 401), res.end("No token!");
  }
  req.user = await Users.find(token); // <== fake
  next(); // done, woot!
}

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return send.error(res, { code: 401, message: "Token Missing" }, 401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      log.error(err);
      return send.error(res, { code: 403, message: "Invalid Token" }, 403);
    }
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}
module.exports = authenticateToken;

//exports.authenticateToken = authenticateToken;
