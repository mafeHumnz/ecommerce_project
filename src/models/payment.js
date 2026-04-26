import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
{
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
    index: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  method: {
    type: String,
    enum: ["card", "paypal", "cash"],
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending"
  },

  transactionId: {
    type: String // ID de Stripe / PayPal
  },

  paidAt: Date

},
{ timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);