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

