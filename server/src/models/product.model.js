const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Mobile", "Mobile Accessories", "Tablet", "Laptop"],
    },
    //its better to make category on another collection to support scalable
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    //images
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    //ratingOverall
    //reviews
    //optional flags
    //slang
    specifications: {
      type: Object,
      default: {},
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
productSchema.virtual("finalPrice").get(function () {
  return parseInt(this.price - this.price * (this.discount / 100));
});
module.exports = mongoose.model("Product", productSchema);
