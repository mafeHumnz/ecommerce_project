import { Router } from "express";
import { protect } from "../middlewares/protect_middleware.js";
import { isUser } from "../middlewares/auth_middleware.js";
import { createPaymentValidator, confirmPaymentValidator, failPaymentValidator } from "../validators/payment_validator.js";
import { validateRequest } from "../middlewares/validate_middleware.js";
import { handleCreatePayment, handleConfirmPayment, handleFailPayment } from "../controllers/payment_controller.js";

const router = Router();

router.post("/", protect, isUser, createPaymentValidator, validateRequest, handleCreatePayment);
router.post("/confirm", protect, isUser, confirmPaymentValidator, validateRequest, handleConfirmPayment);
router.post("/fail/:paymentId", protect, isUser, failPaymentValidator, validateRequest, handleFailPayment);

export default router;