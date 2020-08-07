const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
    },
    popularity: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("product", productSchema);
