const { body } = require("express-validator");
const AccountModel = require("./db/accountModel");

exports.signupValidation = [
  body("userName")
    .notEmpty()
    .withMessage("Please enter a user name")

    .isLength({ min: 4, max: 12 })
    .withMessage("Make sure username is 4 to 12 characters long")

    .isString()
    .withMessage("User name is not a string")

    .custom((value) => {
      return AccountModel.find({ userName: value }).then((user) => {
        if (user) {
          return Promise.reject("User name is already in use.");
        }
      });
    }),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")

    .custom((value) => {
      return AccountModel.find({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("User email is already in use.");
        }
      });
    }),

  body("password")
    .isEmpty()
    .withMessage("Please enter a valid password")

    .isString()
    .withMessage("Not a string."),

  body("firstName")
    .isEmpty()
    .withMessage("Please enter a valid first name")

    .isString()
    .withMessage("Not a string.")

    .isLength({ max: 50 })
    .withMessage("Maximum number of characters exceeded."),

  body("lastName")
    .isEmpty()
    .withMessage("Please enter a valid first name")

    .isString()
    .withMessage("Not a string.")

    .isLength({ max: 50 })
    .withMessage("Maximum number of characters exceeded."),

  body("address")
    .isEmpty()
    .withMessage("Please enter a valid first name")

    .isString()
    .withMessage("Not a string."),

  // body('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
  // body('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];
