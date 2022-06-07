const express = require("express");
const app = express();
// const passport = require("passport");
// var cookieSession = require("cookie-session");

// app.use(cookieSession({ name: "tuto session", keys: ["key1", "key2"] }));

// app.use(passport.initialize());
// app.use(passport.session());

app.get("/google/failed", (req, res) => {
  res.send("You failed to login");
});

app.get("/google/success", (req, res) => {
  res.send("Successfully logged in");
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/google/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
