const route = require("express").Router();
const passport = require("passport");

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
    console.log(req);
    res.send("success");
  }
);

route.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = route;
