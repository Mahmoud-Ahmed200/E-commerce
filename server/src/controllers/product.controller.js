const products = require("../models/product.model");
const { buildProductFilter } = require("../utils/product");
const getProductByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const product = await products.findById(id);
    return res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getProductsByFilter = async (req, res) => {
  try {
    const filter = buildProductFilter(req.query);
    const Products = await products.find(filter);
    return res.status(200).json({
      message: "Products fetched successfully",
      Products,
      count: Products.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getProductByID,
  getProductsByFilter,
};
