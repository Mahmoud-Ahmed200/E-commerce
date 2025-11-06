const products = require("../models/product.model");
const { buildProductFilter, buildSortOptions } = require("../utils/product");

const getProductsByFilter = async (req, res) => {
  try {
    const { page = 1, limit = 12, sortBy = "newest" } = req.query;

    const filter = buildProductFilter(req.query);
    const sort = buildSortOptions(sortBy);

    const skip = (page - 1) * limit;

    const [Products, total] = await Promise.all([
      products.find(filter).sort(sort).limit(Number(limit)).skip(skip),
      products.countDocuments(filter),
    ]);

    return res.status(200).json({
      message: "Products fetched successfully",
      products: Products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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

module.exports = {
  getProductByID,
  getProductsByFilter,
};
