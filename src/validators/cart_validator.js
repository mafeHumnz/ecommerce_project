import { body } from "express-validator";

export const createCartValidator = [
    body("products").isArray({ min: 1 }).withMessage("El carrito debe contener al menos un producto"),
    body("products.*.productId").notEmpty().withMessage("El ID del producto es obligatorio"),
    body("products.*.quantity")
        .notEmpty()
        .withMessage("La cantidad es obligatoria")
        .isInt({ gt: 0 })
        .withMessage("La cantidad debe ser un número entero positivo"),
];

export const updateCartValidator = [
    body("products").optional().isArray({ min: 1 }).withMessage("El carrito debe contener al menos un producto"),
    body("products.*.productId").notEmpty().withMessage("El ID del producto es obligatorio"),
    body("products.*.quantity")
        .notEmpty()
        .withMessage("La cantidad es obligatoria")
        .isInt({ gt: 0 })
        .withMessage("La cantidad debe ser un número entero positivo"),
];