const route = require("express").Router();

route.use(
  "/products",
  require("./products")
  // #swagger.tags = ['Products']
);

route.use(
  "/accounts",
  require("./accounts")
  // #swagger.tags = ['Accounts']
);

route.use("/", require("./documentation"));

module.exports = route;
