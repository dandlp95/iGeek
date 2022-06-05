const jwt = require("jsonwebtoken");
const api401Error = require("../errorHandling/api401Error");

const requireToken = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[0];
  let decodedToken;

  try {
    decodedToken = jwt.verify(process.env.JWT_SECRET_KEY);
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
