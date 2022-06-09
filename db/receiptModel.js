const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReceiptSchema = new Schema({
  purchase: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      productName: {
        type: String,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      AccountId: {
        type: Schema.Types.ObjectId,
        ref: "Account",
      },
    },
  ],
});

const Receipt = mongoose.model("Receipt", ReceiptSchema);

module.exports = Receipt;
