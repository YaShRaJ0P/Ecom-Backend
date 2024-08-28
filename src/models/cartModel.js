const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
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

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Middleware to update the updatedAt field
cartSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware to calculate the total price before saving the cart
cartSchema.pre("save", async function (next) {
  let total = 0;
  for (let item of this.items) {
    const product = await mongoose.model("Product").findById(item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  this.totalPrice = total;
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
