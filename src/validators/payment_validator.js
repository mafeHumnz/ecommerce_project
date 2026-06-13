import {body} from 'express-validator';

export const createPaymentValidator = [
    body("orderId").notEmpty().withMessage("El ID de la orden es obligatorio"),
    body("method").notEmpty().withMessage("El método de pago es obligatorio")
];

export const confirmPaymentValidator = [
    body("paymentId").notEmpty().withMessage("El ID del pago es obligatorio"),
    body("transactionId").notEmpty().withMessage("El ID de la transacción es obligatorio")
];

export const failPaymentValidator = [
    body("paymentId").notEmpty().withMessage("El ID del pago es obligatorio")
];  