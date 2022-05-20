const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

    productName: {
        type:String,
        required: true
    },
    productDescription: {
        type:String,
        required: true
    },
    quantity: {
        type:String,
        required: true
    }
})