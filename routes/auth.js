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
  passport.authenticate("google", { failureMessage: "failed to log in." }),
  (req, res) => {
    const token = jwt.sign(
      {
        email: req.user.email,
        id: req.user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    console.log(req.user);
    res.send(token);
  }
);

route.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = route;
