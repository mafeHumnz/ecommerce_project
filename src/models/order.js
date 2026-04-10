import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: String, 
    price: {       
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { _id: false });

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: [orderItemSchema], // Array embebido
        totalAmount: {
            type: Number,
            required: true
        },
        shippingAddress: {
            address: String,
            city: String,
            country: String
        },
        status: {
            type: String,
            enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
            default: "pending"
        },
        paymentMethod: String,
        paymentId: String // ID que te da la pasarela (Stripe/PayPal)
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);