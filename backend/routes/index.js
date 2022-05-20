const route = require("express").Router();

route.use("/products", require("./products"));

route.use("/accounts", require("./accounts"));
