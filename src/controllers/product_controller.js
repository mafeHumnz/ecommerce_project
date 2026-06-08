import {createProduct, getProducts, getProductById, updateProduct,
    deleteProduct} from '../services/product_service.js';



export const createProductController = async (req, res) => {

    try {
        const product = await createProduct(req.body);
        res.status(201).json({
            success: true,
            message: "Producto creado exitosamente",
            data: product
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message });
    }
};

export const getProductsController = async (req, res) => {

    try {
        const products = await getProducts();
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message });
    }
};

export const getProductByIdController = async (req, res) => {
    
    try {
        const product = await getProductById(req.params.id);
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(404).json({ 
            success: false,
            message: error.message });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const product = await updateProduct(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Producto actualizado exitosamente",
            data: product
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        await deleteProduct(req.params.id);
        res.status(200).json({
            success: true,
            message: "Producto eliminado exitosamente"
        });
    } catch (error) {
        res.status(404).json({ 
            success: false,
            message: error.message });
    }
};