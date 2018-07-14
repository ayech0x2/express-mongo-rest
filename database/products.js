import Product from "../models/products";

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
export async function getAll(req, res) {
  try {
    const products = await Product.find({});
    console.log(products)
    // const products = await new Product(req.body).save();
    return res.status(201).json(products);
  } catch (e) {
    if (e.name === "ValidationError")
      return res.status(400).json({
        error: e.message
      });
    return res.status(500).json({ error: e.message });
  }
}
export async function getOne(req,res){
  try {
    const product = await Product.find({_id:req.params.id});
    return res.status(200).json(product);
  } catch (e) {
    if (e.name === "ValidationError")
      return res.status(400).json({
        error: e.message
      });
    return res.status(500).json({ error: e.message });
  }
}
export async function deleteOne(req,res){
  try {
    await Product.findByIdAndRemove(req.params.id)
    return res.status(202).json("Product deleted");
  } catch (e) {
    if (e.name === "ValidationError")
      return res.status(400).json({
        error: e.message
      });
    return res.status(500).json({ error: e.message });
  }
}
