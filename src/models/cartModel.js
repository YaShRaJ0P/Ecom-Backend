import { Schema, module } from "mongoose";
// Define the Cart Item schema
const cartItemSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  size: {
    type: String,
    enum: ["S", "M", "L", "XL"],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

// Define the Cart schema
const cartSchema = new Schema(
  {
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalItems: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to calculate total price and total items before saving the cart
cartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  this.totalItems = this.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  next();
});

module.exports = model("Cart", cartSchema);
