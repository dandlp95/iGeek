const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.render("login");
});

routes.get("/success", (req, res) => {
  res.render("success");
});
module.exports = routes;