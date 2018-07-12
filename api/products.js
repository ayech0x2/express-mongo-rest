import express from "express";
const productRoutes = express.Router();
import Product from "../models/products";
import mongoose from "mongoose";

productRoutes.get("/", (req, res, next) => {
  res.status(200).json({
    products: {
      name: "sablito",
      price: "1dt"
    }
  });
});

productRoutes.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
        res.status(200).json(product);
    })
    .catch(e => console.log(e));

});

productRoutes.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
      .exec()
      .then(doc=>res.status(200).json(doc))
      .catch(e=>res.status(500).json("Error",e))
});
productRoutes.patch("/:productId", (req, res, next) => {
  res.status(200).json("updating product");
});
productRoutes.delete("/:productId", (req, res, next) => {
  Product.findById(req.params.productId).deleteOne()
  res.status(200).json("deleting product");
});

export default productRoutes;
