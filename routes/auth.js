const route = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Auth with Google
// Get /auth/google
route.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Auth Callback
// Get /auth/google/callback
route.get(
  "/google/callback",
  passport.authenticate("google", { failureMessage: "Failed to authenticate" }),
  (req, res) => {
    const token = jwt.sign(
      {
        email: req.user.email,
        id: req.user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token);
    res.redirect("/views/success");
  }
);

route.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = route;
