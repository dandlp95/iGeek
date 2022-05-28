const ProductModel = require("../db/productModel");

const getAllProducts = async (req, res) => {
  const products = await ProductModel.find({});

  try {
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getById = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  try {
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addProduct = (req, res) => {
  const product = new ProductModel(req.body);

  try {
    product.save();
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

const editProduct = (req, res) => {
  ProductModel.findByIdAndUpdate(req.params.id, req.body, (err, docs) => {
    if (err) {
      res.status(400).send(err)
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
