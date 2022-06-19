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

route.use("/auth", require("./auth") /*#swagger.ignore = true*/);

route.use("/views", require("./views") /*#swagger.ignore = true*/);

route.use("/", require("./documentation") /*#swagger.ignore = true*/);

module.exports = route;
