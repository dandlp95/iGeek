const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const AccountSchema = new Schema({
  googleId: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    dropDuplicates: true,
  },
  password: {
    type: String,
    // required: true,
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
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDuplicates: true,
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

AccountSchema.pre("save", async function (next) {
  if (this.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  }
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
