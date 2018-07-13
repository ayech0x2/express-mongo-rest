import Product from "../models/products";
import mongoose from "mongoose";

export async function createOne(req, res) {
  try {
    const product = await new Product(req.body).save();
    return res.status(201).json(product);
  } catch (e) {
    if (e.name === "ValidationError")
      return res.status(400).json({
        error: e.message
      });
    return res.status(500).json({ error: e.message });
  }
}
// export async function getAll(req, res) {
//   try {
//     const products = await new Product(req.body).save();
//     return res.status(201).json(product);
//   } catch (e) {
//     if (e.name === "ValidationError")
//       return res.status(400).json({
//         error: e.message
//       });
//     return res.status(500).json({ error: e.message });
//   }
// }
