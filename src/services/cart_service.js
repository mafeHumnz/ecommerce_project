import {Cart} from "../models/cart.js";
import {Product} from "../models/product.js";

export const getCart = async (userId) => {

    let shoppingCart = await Cart.findOne({user:userId})

    if(!shoppingCart) {
        shoppingCart = await Cart.create({
    user: userId,
    items: []
  });
    }

    return shoppingCart;
};

export const addItem = async (userId, productId, quantity) => {

    let shoppingCart = await Cart.findOne({user:userId})

    if(!shoppingCart) {
        shoppingCart = await getCart(userId);
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Producto no existe");
    }

    const itemExistente = shoppingCart.items.find(item => item.product.toString() === productId);

    if(itemExistente){
        itemExistente.quantity += quantity;
    }else{
        shoppingCart.items.push({
            product: productId, quantity
        });
    }

    await shoppingCart.save();

    const updatedCart = await Cart.findOne({user:userId}).populate("items.product");

    return updatedCart;
};

export const removeItem = async (userId, productId) => {
    let shoppingCart = await getCart(userId);

    const itemExistente = shoppingCart.items.find(item => item.product.toString() === productId);
    
    if(!itemExistente){
        throw new Error("Item no existe");
    }

    shoppingCart.items = shoppingCart.items.filter(item => item.product.toString() !== productId);

    await shoppingCart.save();

    const updatedCart = await Cart.findOne({user:userId}).populate("items.product");

    return updatedCart;

};

export const updateItem = async (userId, productId, quantity) => {

    let shoppingCart = await getCart(userId);

    const itemExistente = shoppingCart.items.find(item => item.product.toString() === productId);

    if(!itemExistente){
        throw new Error("Item no existe");
    }

    if (quantity < 0) {
    throw new Error("Cantidad no válida");
    }

    if(quantity === 0){
        return removeItem(userId, productId);
    }

    itemExistente.quantity = quantity;

    await shoppingCart.save();

    const updatedCart = await Cart.findOne({user:userId}).populate("items.product");

    return updatedCart;

};

export const clearCart = async (userId) => {

    let shoppingCart = await getCart(userId);

    shoppingCart.items = [];

    await shoppingCart.save();

    const updatedCart = await Cart.findOne({user:userId}).populate("items.product");
    
    return updatedCart;
};

export const getCartTotal = async (userId) => {

    let shoppingCart = await getCart(userId);

    await shoppingCart.populate("items.product");

    if (item.quantity < 0) {
    throw new Error("Cantidad inválida");
    }

    const total = shoppingCart.items.reduce((acc, item) => {
        return acc + ((item.product?.price || 0) * item.quantity);
    }, 0);

    return total;
};