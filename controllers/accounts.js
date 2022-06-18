const AccountModel = require("../db/accountModel");
const Api404Error = require("../errorHandling/api404Error");
const Api401Error = require("../errorHandling/api401Error");
const ReceiptModel = require("../db/receiptModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { encryptPassword } = require("../middleware/utilities");

const getAllAccounts = async (req, res) => {
  const accountId = req.accountId;

  if (accountId) {
    try {
      const account = await AccountModel.findById(accountId);

      if (!account) {
        throw new Api404Error("Not authorized.");
      }

      const role = account.role;

      if (role == "admin") {
        const accounts = await AccountModel.find({});
        if (accounts === null) {
          throw new Api404Error("No accounts found.");
        } else {
          res.status(200).send(accounts);
        }
      } else {
        throw new Api404Error("This request is admin level only.");
      }
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(401).send("Please log in");
  }
};

const getById = async (req, res, next) => {
  if (req.params.id === req.accountId) {
    try {
      const account = await AccountModel.findById(req.accountId);
      if (account === null) {
        throw new Api404Error(`User with id: ${req.params.id} not found.`);
      } else {
        res.status(200).send(account);
      }
    } catch (err) {
      res.status(400).send(err); // Sends error to error handler middleware
    }
  } else {
    const err = new Api401Error("Not allowed."); // Need to test this.
    next(err);
  }
};

const addAccount = async (req, res) => {
  const errors = validationResult(req);

  const account = new AccountModel(req.body); // Does this go inside try block tho?

  try {
    if (!errors.isEmpty()) {
      res.status(422).send(errors.array());
    } else {
      try {
        await account.save();
        res.status(200).send(account);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const editAccount = async (req, res, next) => {
  if (req.accountId === req.params.id) {
    if (req.body.password) {
      req.body.password = await encryptPassword(req.body.password);
    }

    const accountEdits = {
      userName: req.body.userName,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
    };

    console.log(accountEdits);

    for (field in accountEdits) {
      if (field === null) {
        delete field;
      }
    }
    try {
      AccountModel.findByIdAndUpdate(
        req.params.id,
        accountEdits,
        (err, docs) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send(docs);
          }
        }
      );
    } catch (err) {
      next(err); // next(err) or res.send(err)??
    }
  } else {
    const err = new Api401Error("Not authorized to update account.");
    next(err);
  }
};

const deleteAccount = async (req, res) => {
  if (req.params.id === req.accountId) {
    try {
      AccountModel.findByIdAndDelete(req.params.id, (err, docs) => {
        if (err) {
          res.status(400).send(err);
        } else {
          if (docs === null) {
            res.status(400).send("No account found.");
          } else {
            res.status(200).send(docs);
          }
        }
      });
    } catch (err) {
      res.status(500).send(err); // next(err) or res.send(err)??
    }
  } else {
    const err = new Api401Error("Not authorized to delete.");
    next(err);
  }
};

const login = (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  let accountInfo;
  AccountModel.findOne({ userName: userName })
    .then((account) => {
      if (!account) {
        throw new Api404Error(`Account not found`);
      }
      accountInfo = account;
      return bcrypt.compare(password, account.password);
    })
    .then((matches) => {
      if (!matches) {
        throw new Api401Error(`Wrong passwords`);
      }
      const token = jwt.sign(
        {
          email: accountInfo.email,
          id: accountInfo._id.toString(),
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .send({ token: token, userId: accountInfo._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const purchase = async (req, res) => {
  try {
    if (req.accountId) {
      const receiptData = {
        accountId: req.accountId,
        purchase: req.body,
      };
      const receipt = new ReceiptModel(receiptData);
      const receiptId = receipt._id;
      await receipt.save();

      const account = await AccountModel.findById(req.accountId);
      account.purchases.push(receiptId);
      await account.save();
      res.status(200).send("Success");
    } else {
      res.status(500).send("Fail.");
    }
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};

module.exports = {
  getAllAccounts,
  getById,
  addAccount,
  editAccount,
  deleteAccount,
  login,
  purchase,
};
