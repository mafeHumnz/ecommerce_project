import { body } from "express-validator";

export const createCategoryValidator = [
    body("name").notEmpty().withMessage("El nombre de la categoría es obligatorio"),
    body("description").optional().isString().withMessage("La descripción debe ser una cadena de texto")
];

export const updateCategoryValidator = [
    body("name").optional().notEmpty().withMessage("El nombre de la categoría no puede estar vacío"),
    body("description").optional().isString().withMessage("La descripción debe ser una cadena de texto")
];  