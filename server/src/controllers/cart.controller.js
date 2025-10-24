const cartModel = require("../models/cart.model");
const getCart = async (req, res) => {
  try {
    const user = req.user;
    let userCart = await cartModel
      .findOne({ user: user.id })
      .populate("items.product");
    if (!userCart) {
      userCart = new cartModel({
        items: [],
        user: user.id,
      });
      // Filter out any items where the product was deleted (is null)
      userCart.items = userCart.items.filter((item) => item.product);
      await userCart.save();
    }

    let cartTotal = 0;
    if (userCart.items.length > 0) {
      cartTotal = userCart.items.reduce((prev, curr) => {
        return prev + curr.product.price * curr.quantity;
      }, 0);
    }
    return res.status(200).json({
      userCart,
      cartTotal,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const addCartItem = async (req, res) => {
  try {
    const { product } = req.body;
    const user = req.user;

    let userCart = await cartModel.findOneAndUpdate(
      { user: user.id, "items.product": product._id },
      { $inc: { "items.$.quantity": 1 } },
      { new: true }
    );

    if (!userCart) {
      userCart = await cartModel.findOneAndUpdate(
        { user: user.id },
        { $push: { items: { product: product._id, quantity: 1 } } },
        { new: true, upsert: true }
      );
    }

    return res
      .status(201)
      .json({ message: "Item added successfully", userCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updateProductQuantity = async (req, res) => {
  try {
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    const user = req.user;
    if (quantity < 1) {
      return res.status(400).json({
        message: "quantity must be greater than or equal 1",
      });
    }
    const userCart = await cartModel.findOneAndUpdate(
      { user: user._id, "items.product": productId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );
    if (!userCart) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({
      message: "Quantity updated successfully",
      userCart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = req.user;
    const userCart = await cartModel.findOneAndUpdate(
      { user: user._id, "items.product": productId },
      { $pull: { items: { product: productId } } },
      { new: true }
    );

    if (!userCart) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    return res.status(200).json({
      message: "Item deleted successfully",
      userCart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const clearCart = async (req, res) => {
  try {
    const user = req.user;
    let userCart = await cartModel.findOneAndUpdate(
      { user: user._id },
      { $set: { items: [] } },
      { upsert: true, new: true }
    );
    return res
      .status(200)
      .json({ message: "cart cleared successfully", userCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getCart,
  updateProductQuantity,
  addCartItem,
  deleteProduct,
  clearCart,
};
