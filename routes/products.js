import express from "express";
const productRoutes = express.Router();
import {createOne, getAll, getOne, deleteOne} from "../database/products";

productRoutes.get("/products", (req, res) => getAll(req, res));
productRoutes.post("/product", (req, res) => createOne(req, res));
productRoutes.post("/product/:id", (req, res) => getOne(req, res));
productRoutes.delete("/product/:id", (req, res) => deleteOne(req, res));
export default productRoutes;
