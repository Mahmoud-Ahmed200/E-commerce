const mongoose = require("mongoose");
const wishlistSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref:"User"
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Wishlist", wishlistSchema);
