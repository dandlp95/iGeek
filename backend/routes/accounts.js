const route = require("express").Router();
const accounts = require("../controllers/accounts");

route.get("/", accounts.getAllAccounts);
route.get("/:id", accounts.getById);
route.post("/", accounts.addAccount);

module.exports = route;
