const AccountModel = require("../db/accountModel");

const getAllAccounts = async (req, res) => {
  const accounts = await AccountModel.find({});

  try {
    res.status(200).send(accounts);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  const account = await AccountModel.findById(req.params.id);

  try {
    res.status(200).send(account);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addAccount = async (req, res) => {
  const account = new AccountModel(req.body);

  try {
    await account.save();
    res.status(200).send(account);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getAllAccounts, getById, addAccount };
