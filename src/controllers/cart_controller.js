import { getCart, addItem, removeItem, updateItem, clearCart } from "../services/cart_service.js";

export const getCartController = async (req, res) => {
    try {
        const userId = req.user._id;
        const shoppingCart = await getCart(userId);
        res.json(shoppingCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addItemController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        const updatedCart = await addItem(userId, productId, quantity);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeItemController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;
        const updatedCart = await removeItem(userId, productId);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateItemController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;
        const { quantity } = req.body;
        const updatedCart = await updateItem(userId, productId, quantity);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const clearCartController = async (req, res) => {
    try {
        const userId = req.user._id;
        await clearCart(userId);
        res.json({ message: "Carrito vaciado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  