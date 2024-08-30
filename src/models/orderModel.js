import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, "Please provide an address"],
      },
      city: {
        type: String,
        required: [true, "Please provide a city"],
      },
      phoneNo: {
        type: String,
        required: [true, "Please provide a phone number"],
        match: [/^\d{10,15}$/, "Please provide a valid phone number"],
      },
      postalcode: {
        type: String,
        required: [true, "Please provide a postal code"],
        match: [/^\d{5,10}$/, "Please provide a valid postal code"],
      },
      state: {
        type: String,
        required: [true, "Please provide a state"],
        trim: true,
      },
      country: {
        type: String,
        required: [true, "Please provide a country"],
        trim: true,
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: [true, "Please provide the quantity"],
          min: [1, "Quantity cannot be less than 1"],
        },
        size: {
          type: String,
          enum: ["S", "M", "L", "XL"],
          required: [true, "Please provide the size"],
        },
        color: {
          type: String,
          required: [true, "Please provide the color"],
        },
        totalPrice: {
          type: Number,
          required: [true, "Please provide the price"],
          min: [0, "Price cannot be negative"],
        },
      },
    ],
    paymentInfo: {
      id: {
        type: String,
        trim: true,
      },
      payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    },
    taxAmount: {
      type: Number,
      required: [true, "Tax amount is required"],
      min: [0, "Tax amount cannot be negative"],
    },
    shippingAmount: {
      type: Number,
      required: [true, "Shipping amount is required"],
      min: [0, "Shipping amount cannot be negative"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    deliveredAt: {
      type: Date,
      reuired: [true, "Delivery date is required"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
