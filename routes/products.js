import express from "express";
const productRoutes = express.Router();
import { createOne, getAll } from "../controllers/products";

// productRoutes.get("/", (req, res) => getAll(req, res));
productRoutes.post("/", (req, res) => createOne(req, res));
export default productRoutes;
