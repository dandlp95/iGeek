const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.render("login");
});

routes.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
module.exports = routes;