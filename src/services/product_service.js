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

export const updateProduct = async (
    id,
    { name, description, price, stock, image, category, isActive }
) => {

    const product = await Product.findById(id);

    if (!product) {
        throw new Error("Producto no encontrado");
    }

    // NAME
    if (name !== undefined) {

        if (typeof name !== "string") {
            throw new Error("El nombre debe ser un texto");
        }

        const normalizedName = name.trim().toLowerCase();

        if (normalizedName === "") {
            throw new Error("El nombre no puede estar vacío");
        }

        const existingProduct = await Product.findOne({
            name: normalizedName,
            isActive: true
        });

        if (
            existingProduct &&
            existingProduct._id.toString() !== id
        ) {
            throw new Error("Ya existe un producto activo con este nombre");
        }

        product.name = normalizedName;
    }

    // DESCRIPTION
    if (description !== undefined) {
        product.description = description;
    }

    // PRICE
    if (price !== undefined) {

        if (
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            price < 0
        ) {
            throw new Error("El precio debe ser un número válido");
        }

        product.price = price;
    }

    // STOCK
    if (stock !== undefined) {

        if (
            typeof stock !== "number" ||
            !Number.isInteger(stock) ||
            stock < 0
        ) {
            throw new Error("El stock debe ser un entero positivo");
        }

        product.stock = stock;
    }

    // IMAGE
    if (image !== undefined) {
        product.image = image;
    }

    // CATEGORY
    if (category !== undefined) {

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            throw new Error("Categoría no encontrada");
        }

        if (!categoryExists.isActive) {
            throw new Error("La categoría no está activa");
        }

        product.category = category;
    }

    // IS ACTIVE
    if (isActive !== undefined) {
        product.isActive = isActive;
    }

    await product.save();

    const updatedProduct = await Product.findById(product._id)
        .populate("category", "name slug");

    return updatedProduct;
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