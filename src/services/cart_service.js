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

    const updateCart = await Cart.findOne({user:userId}).populate("items.product");

    return updateCart;
};