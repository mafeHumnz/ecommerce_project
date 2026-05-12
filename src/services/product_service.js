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

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
        throw new Error("Categoría no encontrada");
    }

    if(!categoryExists.isActive){
        throw new Error("La categoría no está activa");
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

export const getProductById = async (id) => {
    
    const product = await Product.findOne({_id:id, isActive:true}).populate("category");

    if (!product) {
        throw new Error("Producto no encontrado");
    }
    
    return product;
};

export const updateProduct = async (id, { name, description, price, stock, image, category, isActive }) => {

    const product = await Product.findById(id);

    if (!product) {
        throw new Error("Producto no encontrado");
    }

    if (name && typeof name === "string") {
        product.name = name.trim();
    }

    if (description) {
        product.description = description;
    }

    if (price != null && typeof price === "number" && price >= 0) {
        product.price = price;
    }

    if (stock != null && typeof stock === "number" && stock >= 0) {
        product.stock = stock;
    }

    if (image) {
        product.image = image;
    }

    

    if (category) {
        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            throw new Error("Categoría no encontrada");
        }

        if (!categoryExists.isActive) {
            throw new Error("La categoría no está activa");
        }

        product.category = category;
    }

    if (isActive !== undefined) {
        product.isActive = isActive;
    }

    await product.save();

    return product;
};

export const deleteProduct = async (id) => {
    
    const product = await Product.findById(id);

    if (!product) {
        throw new Error("Producto no encontrado");
    }

    product.isActive = false;

    await product.save();

    return product;
};