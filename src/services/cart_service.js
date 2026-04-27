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