const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    dropDuplicates: true
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    dropDuplicates: true
  },
  purchases:{
    type:[],
    required: true
  }
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
