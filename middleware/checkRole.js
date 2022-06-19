const mongoose = require("mongoose");
const AccountModel = require("../db/accountModel");
const Api401Error = require("../errorHandling/api401Error");

const checkRole = async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.accountId);

  const user = await AccountModel.findOne({ _id: id });
  try {
    if (!user || user.role !== "admin") {
      throw new Api401Error("Not authorized.");
    }
    if (user.role === "admin") {
      req.accountRole = user.role;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { checkRole };
