const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  userName: {
    type: String,
    required: true,
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
    required: true
  },
  purchases: [
    {
      receipt: {
        type: Schema.Types.ObjectId,
        ref: "Receipt",
      },
    },
  ],
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
