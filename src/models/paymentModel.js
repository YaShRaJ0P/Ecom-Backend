import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    currency: {
      type: String,
      default: "INR",
    },
    paymentGateway: {
      type: String,
      enum: ["Stripe", "Razorpay"],
      required: [true, "Payment gateway is required"],
    },
    paymentId: {
      type: String,
      required: [true, "Payment ID is required"],
    },
    status: {
      type: String,
      enum: ["Success", "Failed", "Pending"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "UPI", "Net Banking", "Wallet"],
      required: [true, "Payment method is required"],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
