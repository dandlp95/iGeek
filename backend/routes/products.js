const route = require("express").Router();
const products = require("../controllers/products");

route.get("/", products.getAllProducts);
route.get("/:id", products.getById);
route.post("/", products.addProduct);

module.exports = route;


