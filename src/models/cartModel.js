import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  color: {
    type: String,
    required: true,
  },
});

module.exports = model("Cart", cartSchema);
