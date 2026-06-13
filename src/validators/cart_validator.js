import { body } from "express-validator";

export const addItemValidator = [
    body("productId").notEmpty().withMessage("El ID del producto es obligatorio"),
    body("quantity").isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor a 0")
];

export const updateItemValidator = [
    body("quantity").isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor a 0")
];      