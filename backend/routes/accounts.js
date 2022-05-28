const route = require("express").Router();
const accounts = require("../controllers/accounts");
const { signupValidation } = require("../validators");

route.get(
  "/",
  accounts.getAllAccounts
  /* #swagger.summary = 'Returns all accounts' */
  /* #swagger.description = 'Returns all accounts added to database.' */
  /* #swagger.operationId = 'getAllAccounts.' */
  /* #swagger.responses[200] = {
      description: 'Returns all accounts.',
      schema: {$ref: '#/definitions/Accounts'}
  } */
);
route.get(
  "/:id",
  accounts.getById
  /* #swagger.summary = 'Returns 1 account by Id.' */
  /* #swagger.description = 'Returns the account with the Id that matches the request
    Id.' */
  /* #swagger.operationId = 'getAccount' */
  /* #swagger.parameters['id'] = {description: 'Product Id'} */
  /* #swagger.responses[200] = {
    description: 'Returns account with specified request id',
    schema: { $ref: '#/definitions/Account'}
  } */
);

route.post(
  "/add_account",
  signupValidation,
  accounts.addAccount
  /* #swagger.summary = 'Adds 1 account.' */
  /* #swagger.description = 'Adds the account in the request.' */
  /* #swagger.operationId = 'addAccount' */
  /* #swagger.parameters = [{
    name: 'body', 
    in:'body',
    schema: { $ref: '#/definitions/Account' }
  }] */
  /* #swagger.responses[200] = {
    description: 'Returns posted product',
    schema: { $ref: '#/definitions/Account'}
  }
  */
);

route.put("/edit_account/:id", accounts.editAccount);

route.delete("/delete_account/:id", accounts.deleteAccount);

module.exports = route;
