import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Men", "Women", "Kids", "Accessories"], // Define categories according to your needs
    default: "Accessories",
  },
  brand: {
    type: String,
    required: true,
  },
  sizes: [
    {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
  ],
  colors: [
    {
      type: String,
      required: true,
    },
  ],
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  images: [
    {
      type: String, // URLs of product images stored in Cloudinary or other storage
      required: true,
    },
  ],
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Middleware to set the updatedAt field
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = model("Product", productSchema);
