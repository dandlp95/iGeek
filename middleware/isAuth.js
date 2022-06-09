const jwt = require("jsonwebtoken");
const api401Error = require("../errorHandling/api401Error");
const { ensureAuth } = "./OAuth";

const requireToken = (req, res, next) => {
  if (!req.get("Authorization")) {
    // throw api401Error("Not authenticated.");
    ensureAuth(req, res, next); // Not sure about this one.
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    err.status = 500;
    throw err;
  }
  if (!decodedToken) {
    throw new api401Error("Not authenticated.");
  }
  req.userId = decodedToken.userId;
  next();
};

module.exports = { requireToken };
