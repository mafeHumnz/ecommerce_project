import { getCart, clearCart } from "./cart_service";
import { Order } from "../models/order";

export const createOrder = async (userId) => {

    const cart = await getCart(userId);

    if (cart.items.length === 0){
        throw new Error("El carrito esta vacio");
    }

    await cart.populate("items.product");

    const orderItems = cart.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
    }));

    const total = orderItems.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);

    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount: total,
        status: "pending"
    });

    await clearCart(userId);

    return order;

};