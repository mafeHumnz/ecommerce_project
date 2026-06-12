import { body } from "express-validator";

export const createProductValidator = [
  body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),
  body("price")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número positivo"),
  body("description").optional().isString().withMessage("La descripción debe ser una cadena de texto"),
];

export const updateProductValidator = [
  body("name").optional().notEmpty().withMessage("El nombre del producto no puede estar vacío"),
  body("price")
    .optional()
    .notEmpty()
    .withMessage("El precio no puede estar vacío")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número positivo"),
  body("description").optional().isString().withMessage("La descripción debe ser una cadena de texto"),
];  