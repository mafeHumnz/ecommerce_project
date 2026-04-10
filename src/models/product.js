import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String
  },

  price: {
    type: Number,
    required: true
  },

  stock: {
    type: Number,
    required: true,
    default: 0
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  image: {
    type: String
  },

  isActive: {
    type: Boolean,
    default: true
  }
}
,
 {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);