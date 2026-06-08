import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../services/category_service.js";

export const createCategoryController = async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        const category = await createCategory(name, slug, description);
        res.status(201).json({
            success: true,
            message: "Categoría creada exitosamente",
            data: category
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message });
    }
};

export const getCategoriesController = async (req, res) => {
    try {
        const categories = await getCategories();
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message });
    }
};

export const getCategoryByIdController = async (req, res) => {
    try {
        const category = await getCategoryById(req.params.id);
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(404).json({ 
            success: false,
            message: error.message });
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        const category = await updateCategory(req.params.id, name, slug, description);
        res.status(200).json({
            success: true,
            message: "Categoría actualizada exitosamente",
            data: category
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message });
    }
};

export const deleteCategoryController = async (req, res) => {
    try {
        await deleteCategory(req.params.id);
        res.status(200).json({
            success: true,
            message: "Categoría eliminada exitosamente"
        });
    } catch (error) {
        res.status(404).json({ 
            success: false,
            message: error.message });
    }
};  