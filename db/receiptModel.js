const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReceiptSchema = new Schema({
    products:[
        {
            productName:{
                type: String,
                required: true,
                cost: Number
            }
        }
    ],
    totalCost:{
        type: Number,
        required: true
    }
})

const Receipt = mongoose.model("Receipt", ReceiptSchema);

module.exports = Receipt;