const { body } = require("express-validator");
const AccountModel = require("../db/accountModel");
const ProductModel = require("../db/productModel");

exports.accountValidation = [
  body("userName")
    .notEmpty()
    .withMessage("Please enter a user name")

    .isLength({ min: 4, max: 12 })
    .withMessage("Make sure username is 4 to 12 characters long")

    .isString()
    .withMessage("User name is not a string")

    .custom((value) => {
      // users is an array.
      return AccountModel.find({ userName: value }).then((users) => {
        if (users.length > 0) {
          return Promise.reject("User name is already in use.");
        }
      });
    }),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")

    .custom((value) => {
      return AccountModel.find({ email: value }).then((emails) => {
        if (emails.length > 0) {
          return Promise.reject("User email is already in use.");
        }
      });
    }),

  body("password")
    .notEmpty()
    .withMessage("Please enter a valid password")

    .isString()
    .withMessage("Not a string."),

  body("firstName")
    .notEmpty()
    .withMessage("Please enter a valid first name")

    .isString()
    .withMessage("Not a string.")

    .isLength({ max: 50 })
    .withMessage("Maximum number of characters exceeded."),

  body("lastName")
    .notEmpty()
    .withMessage("Please enter a valid first name")

    .isString()
    .withMessage("Not a string.")

    .isLength({ max: 50 })
    .withMessage("Maximum number of characters exceeded."),

  body("address")
    .notEmpty()
    .withMessage("Please enter a valid first name")

    .isString()
    .withMessage("Not a string."),

  body("purchases").not().exists().withMessage("Field not needed."),
];

exports.productValidation = [
  body("productName")
    .notEmpty()
    .withMessage("Please add product name.")

    .isString()
    .withMessage("Not a string")

    .isLength({ max: 40 })
    .withMessage("Maximum number of characters exceeded")

    .custom((value) => {
      return ProductModel.find({ productName: value }).then((products) => {
        if (products.length > 0) {
          return Promise.reject("Product is already in the database");
        }
      });
    }),

  body("productDescription")
    .notEmpty()
    .withMessage("Please add product description")

    .isString()
    .withMessage("Not a string")

    .isLength({ max: 500 })
    .withMessage("Maximum number of characters exceeded"),

  body("stock")
    .notEmpty()
    .withMessage("Please add stock")

    .isNumeric() // String or integer are valid. Schema will transform it into an integer.
    .withMessage("Not a number"),

  body("cost")
    .notEmpty()
    .withMessage("Please add product cost")

    .isFloat()
    .withMessage("Not a float."),
];

exports.editAccountValidation = [
  body("userName")
    .optional({ nullable: true })

    .isLength({ min: 4, max: 12 })
    .withMessage("Make sure username is 4 to 12 characters long")

    .isString()
    .withMessage("User name is not a string")

    .custom((value) => {
      // users is an array.
      return AccountModel.find({ userName: value }).then((users) => {
        if (users.length > 0) {
          return Promise.reject("User name is already in use.");
        }
      });
    }),

  body("email")
    .optional({ nullable: true })

    .isEmail()
    .withMessage("Please enter a valid email address")

    .custom((value) => {
      return AccountModel.find({ email: value }).then((emails) => {
        if (emails.length > 0) {
          return Promise.reject("User email is already in use.");
        }
      });
    }),

  body("password")
    .optional({ nullable: true })

    .isString()
    .withMessage("Not a string."),

  body("firstName")
    .optional({ nullable: true })

    .isString()
    .withMessage("Not a string.")

    .isLength({ max: 50 })
    .withMessage("Maximum number of characters exceeded."),

  body("lastName")
    .optional({ nullable: true })

    .isString()
    .withMessage("Not a string.")

    .isLength({ max: 50 })
    .withMessage("Maximum number of characters exceeded."),

  body("address")
    .optional({ nullable: true })

    .isString()
    .withMessage("Not a string."),

  body("purchases").not().exists().withMessage("Field not needed."),
];
