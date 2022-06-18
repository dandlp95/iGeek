const route = require("express").Router();
const accounts = require("../controllers/accounts");
const isAuth = require("../middleware/isAuth");
const { accountValidation, editAccountValidation } = require("../middleware/validators");

route.get(
  "/",
  isAuth.requireToken,
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
  isAuth.requireToken,
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
  accountValidation,
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
    description: 'Returns posted account',
    schema: { $ref: '#/definitions/Account'}
  }
  */
);

route.patch(
  "/edit_account/:id",
  editAccountValidation, // <- Need to fix validation for editing account
  isAuth.requireToken,
  accounts.editAccount
  /* #swagger.summary = 'Edits account.' */
  /* #swagger.description = 'Replaces account information with information from the request.' */
  /* #swagger.operationId = 'editAccount' */
  /* #swagger.parameters = [{
  name: 'body', 
  in:'body',
  schema: { $ref: '#/definitions/Account' }
}] */
  /* #swagger.responses[200] = {
  description: 'Returns edit account',
  schema: { $ref: '#/definitions/Account'}
}
*/
);

route.delete(
  "/delete_account/:id",
  isAuth.requireToken,
  accounts.deleteAccount
  /* #swagger.summary = 'Deletes account.' */
  /* #swagger.description = 'Deletes account with specified Id.' */
  /* #swagger.operationId = 'deleteAccount' */
  /* #swagger.responses[200] = {
description: 'Returns deleted account',
schema: { $ref: '#/definitions/Account'}
}
*/
);

route.post("/purchase", isAuth.requireToken, accounts.purchase);

route.post("/login", accounts.login);

module.exports = route;
