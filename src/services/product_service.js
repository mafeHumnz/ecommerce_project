import { Product } from "../models/product.js";

export const createProduct = async ({ name, description, price, stock, image, category, isActive }) => {
    if (!name || typeof name !== "string") {
        throw new Error("El nombre es obligatorio y debe ser un texto");
    }

    if (price == null || typeof price !== "number" || price < 0) {
        throw new Error("El precio es obligatorio y debe ser un número positivo");
    }

    if (stock == null || typeof stock !== "number" || stock < 0) {
        throw new Error("El stock es obligatorio y debe ser un número positivo");
    }

    const product = await Product.create({
        name: name.trim(),
        description,
        price,
        stock,
        image,
        category,
        isActive: isActive !== undefined ? isActive : true
    });

    return product;
};

export const getProducts = async () => {
    const products = await Product.find({isActive:true}).populate("category");

    return products;
};