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
      console.log(value);
      // users is an array.
      return AccountModel.find({ userName: value }).then((users) => {
        if (users.length > 0) {
          console.log(user);
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

  // body('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
  // body('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];
