const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Product name must be at least 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: {
        values: ["Mobile", "Tablet", "Laptop", "Computer", "TV"],
        message: "{VALUE} is not a valid category",
      },
      required: [true, "Category is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: String,
        alt: String,
        isPrimary: { type: Boolean, default: false },
      },
    ],
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },
    specifications: {
      type: Object,
      default: {},
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Calculate final price after discount
productSchema.virtual("finalPrice").get(function () {
  return parseInt(this.price - this.price * (this.discount / 100));
});

module.exports = mongoose.model("Product", productSchema);
