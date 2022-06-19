const route = require("express").Router();
const products = require("../controllers/products");
const {
  productValidation,
  editProductValidation,
} = require("../middleware/validators");
const isAuth = require("../middleware/isAuth");
const role = require("../middleware/checkRole");

route.get(
  "/",
  products.getAllProducts
  /* #swagger.summary = 'Returns all Products' */
  /* #swagger.description = 'Returns all products added to database.' */
  /* #swagger.operationId = 'getAllProducts.' */
  /* #swagger.responses[200] = {
      description: 'Returns all products.',
      schema: {$ref: '#/definitions/Products'}
  } */
);

route.get(
  "/:id",
  products.getById
  /* #swagger.summary = 'Returns 1 product by Id.' */
  /* #swagger.description = 'Returns the product with the Id that matches the request
    Id.' */
  /* #swagger.operationId = 'getProduct' */
  /* #swagger.parameters['id'] = {description: 'Product Id'} */
  /* #swagger.responses[200] = {
    description: 'Returns product with specified request id',
    schema: { $ref: '#/definitions/Product'}
  } */
);

route.post(
  "/add_product",
  isAuth.requireToken,
  role.checkRole,
  productValidation,
  products.addProduct
  /* #swagger.summary = 'Adds 1 product.' */
  /* #swagger.description = 'Adds the product in the request.' */
  /* #swagger.operationId = 'addProduct' */
  /* #swagger.parameters = [{
    name: 'body', 
    in:'body',
    schema: { $ref: '#/definitions/Product' }
  }] */
  /* #swagger.responses[200] = {
    description: 'Returns posted product',
    schema: { $ref: '#/definitions/Product'}
  }
  */
  /* #swagger.security = [{Bearer:[]}]*/
);

route.put(
  "/edit_product/:id",
  isAuth.requireToken,
  editProductValidation,
  role.checkRole,
  products.editProduct
  /* #swagger.summary = 'Edits 1 product.' */
  /* #swagger.description = 'Edits the product with the specified id.' */
  /* #swagger.operationId = 'editProduct' */
  /* #swagger.parameters = [{
  name:'body', 
  in:'body',
  schema: { $ref: '#/definitions/Product' }
}] */
  /* #swagger.responses[200] = {
  description: 'Returns edited product',
  schema: { $ref: '#/definitions/Product'}
}
*/
  /* #swagger.security = [{Bearer:[]}]*/
);

route.delete(
  "/delete_product/:id",
  isAuth.requireToken,
  role.checkRole,
  products.deleteProduct
  /* #swagger.summary = 'Deletes 1 product.' */
  /* #swagger.description = 'Deletes the product with the specified id.' */
  /* #swagger.operationId = 'deleteProduct' */
  /* #swagger.responses[200] = {
description: 'Returns deleted product',
schema: { $ref: '#/definitions/Product'}
}
*/
  /* #swagger.security = [{Bearer:[]}]*/
);

module.exports = route;
