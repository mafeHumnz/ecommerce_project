import {Category} from "../models/category.js";

export const createCategory = async (name, description) => {

    if (!name || typeof name !== "string"){
        throw new Error("El nombre es obligatorio y debe ser un texto");
    }

    const normalizedName = name.trim().toLowerCase();

    const slug = normalizedName.replace(/\s+/g, "-");

    if (normalizedName === "") {
    throw new Error("El nombre no puede estar vacío");
    }

    const existingCategory = await Category.findOne({name:normalizedName});

    if(existingCategory){
        throw new Error("Esta categoria ya existe");
    }

    const category = await Category.create({
        name: normalizedName,
        slug: slug,
        description: description,
        isActive: true
    }) 

    return category;
};

export const getCategories = async () => {
    
    const categories = await Category.find({isActive:true});

    return categories;
};

export const getCategoryById = async (id) => {
    
    const category = await Category.findById(id);

    if (!category) {
        throw new Error("Categoría no encontrada");
    }
    
    return category;
};

export const updateCategory = async (id, name, description) => {

    if (!name || typeof name !== "string"){
        throw new Error("El nombre es obligatorio y debe ser un texto");
    }

    const normalizedName = name.trim().toLowerCase();

    const slug = normalizedName.replace(/\s+/g, "-");

    if (normalizedName === "") {
    throw new Error("El nombre no puede estar vacío");
    }

    const existingCategory = await Category.findOne({name:normalizedName});

    if(existingCategory && existingCategory._id.toString() !== id){
        throw new Error("Esta categoria ya existe");
    }
    
    const category = await Category.findByIdAndUpdate(id, {
        name: normalizedName,
        slug: slug,
        description: description
    }, {new: true});

    if (!category) {
        throw new Error("Categoría no encontrada");
    }

    return category;
};

export const deleteCategory = async (id) => {
    
    const category = await Category.findById(id);

    if (!category) {
        throw new Error("Categoría no encontrada");
    }

    category.isActive = false;

    await category.save();

    return category;
};
