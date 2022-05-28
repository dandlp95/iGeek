const AccountModel = require("../db/accountModel");
const Api404Error = require("../errorHandling/api404Error");
const { validationResult } = require("express-validator");

const getAllAccounts = async (req, res) => {
  const accounts = await AccountModel.find({});

  try {
    res.status(200).send(accounts);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getById = async (req, res, next) => {
  // needs to validate req.params.id
  const account = await AccountModel.findById(req.params.id);
  try {
    if (account === null) {
      throw new Api404Error(`User with id: ${req.params.id} not found.`);
    } else {
      res.status(200).send(account);
    }
  } catch (err) {
    next(err); // Sends error to error handler middleware
  }
};

const addAccount = async (req, res) => {
  const errors = validationResult(req);

  const account = new AccountModel(req.body);
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

const editAccount = async (req, res) => {
  AccountModel.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(docs);
    }
  });
};

const deleteAccount = (req, res) => {
  AccountModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (docs === null) {
        res.status(200).send("Alread deleted.");
      } else {
        res.status(200).send(docs);
      }
    }
  });
};

module.exports = {
  getAllAccounts,
  getById,
  addAccount,
  editAccount,
  deleteAccount,
};
