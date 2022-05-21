const ProductModel = require("../db/productModel");

const getAllProducts = async (req, res) => {
    const products  = await ProductModel.find({});

    try{
        res.status(200).send(products);
    }catch(err){
        res.status(500).send(err);
    }
};

const getById = async (req, res) => {
    const product = await ProductModel.findById(req.params.id);

    try{
        res.status(200).send(product);
    }catch(err){
        res.status(500).send(err);
    }
}

const addProduct = async (req, res) => {
    const product = new ProductModel(req.body);

    try{
        await product.save();
        res.status(200).send(product);
    }catch(err){
        res.status(500).send(err);
    }
}

module.exports = { getAllProducts, getById, addProduct };

