const wishlistModel = require("../models/wishlist.model");

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    let userWishlist = await wishlistModel.findOne({
      user: user.id,
      products: productId,
    });

    if (userWishlist) {
      return res.status(400).json({ message: "product already exist" });
    }

    userWishlist = await wishlistModel.findOneAndUpdate(
      { user: user.id },
      { $push: { products: productId } },
      { new: true, upsert: true }
    );

    return res
      .status(201)
      .json({ message: "product added successfully", userWishlist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = req.user;

    let userWishlist = await wishlistModel
      .findOne({ user: user.id })
      .populate("products");

    if (!userWishlist) {
      userWishlist = new wishlistModel({
        products: [],
        user: user.id,
      });
      await userWishlist.save();
    } else {
      // Filter out any products in case the product was deleted (is null)
      userWishlist.products = userWishlist.products.filter(
        (product) => product
      );
    }

    return res.status(200).json({
      userWishlist,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = req.user;
    
    const userWishlist = await wishlistModel.findOneAndUpdate(
      { user: user._id, products: productId },
      { $pull: { products: productId } },
      { new: true }
    );

    if (!userWishlist) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    return res.status(200).json({
      message: "product removed successfully",
      userWishlist,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};
