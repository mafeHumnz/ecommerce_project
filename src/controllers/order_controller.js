import { createOrder } from "../services/order_service.js";

export const createOrderController = async (req, res) => {
    try {
        const userId = req.user._id;
        const order = await createOrder(userId);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  