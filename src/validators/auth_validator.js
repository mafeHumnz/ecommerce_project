import { body } from "express-validator";

export const registerValidation = [
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("email").isEmail().withMessage("El email debe ser valido"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("El email debe ser valido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];  