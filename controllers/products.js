const ProductModel = require("../db/productModel");
const { validationResult } = require("express-validator");
const Api404Error = require("../errorHandling/api404Error");

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    if (products === null) {
      throw new Api404Error("No products found.");
    } else {
      res.status(200).send(products);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product === null) {
      throw new Api404Error(`User with id: ${req.params.id} not found.`);
    } else {
      res.status(200).send(product);
    }
  } catch (err) {
    res.status(400).send(err); // Sends error to error handler middleware
  }
};

const addProduct = async (req, res) => {
  const product = new ProductModel(req.body);
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      res.status(422).send(errors.array());
    } else {
      try {
        await product.save();
        res.status(200).send(product);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const editProduct = (req, res) => {
  ProductModel.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(docs);
    }
  });
};

const deleteProduct = (req, res) => {
  ProductModel.findByIdAndDelete(req.params.id, (err, docs) => {
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
  getAllProducts,
  getById,
  addProduct,
  editProduct,
  deleteProduct,
};
