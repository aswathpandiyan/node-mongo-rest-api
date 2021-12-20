const send = require("../helper/response.js");
const createError = require("http-errors");
const mongoose = require("mongoose");
const Product = require("../model/products");
const { logger } = require("../helper/logger.js");

exports.getAll = async (req, res, next) => {
  try {
    const result = await Product.find({}, { __v: 0 });
    if (!result) {
      throw createError(404, "Product does not exist");
    }
    send.json(res, result);
  } catch (err) {
    logger.info(err);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const result = await Product.findById(req.params.id, { __v: 0 });
    //const result = await Product.findOne({ id: req.params.id});
    if (!result) {
      // send.json(res, { message: "Product not found" }, 404);
      throw createError(404, "Product does not exist");
    }
    send.json(res, result);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, "Invalid product id"));
      return;
    }
    next(err);
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
      throw createError(404, "Product does not exist");
    }
    send.json(res, result);
  } catch (err) {
    logger.error(err);
    if (err instanceof mongoose.CastError) {
      next(createError(400, "Invalid product id"));
      return;
    }
    next(err);
  }
};

exports.updateById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    const result = await Product.findByIdAndUpdate(id, updates, options);
    if (!result) {
      throw createError(404, "Product does not exist");
    }
    send.json(res, result);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, "Invalid product id"));
      return;
    }
    next(err);
  }
};

exports.create = async (req, res, next) => {
  //promise based
  /* const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then(() => {
      req.logger.info("created succesfully");
      send.json(res, product);
    })
    .catch((err) => req.logger.info(err));
    */
  try {
    const product = new Product(req.body);
    const result = await product.save();
    send.json(res, result);
  } catch (err) {
    logger.info(err.message);
    if (err.name === "ValidationError") {
      next(createError(422, err.message));
      return;
    }
    next(err);
  }
};
