import express from "express";
import productRoutes from "./api/products";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
const app = express();

mongoose.connect("mongodb://localhost:27017/express",{ useNewUrlParser: true });

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   // res.header("Access-Control-Allow-Headers",'*')
// }); // could specify the origin ex:http://hamza.com
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/products", productRoutes);

app.use("/", (req, res, next) => {
  res.status(200).json({
    api: "available"
  });
});

export default app;
