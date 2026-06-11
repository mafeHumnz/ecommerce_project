import { Router } from "express";
import { protect } from "../middlewares/jwt_protect.js";
import { isUser } from "../middlewares/auth.js";
import { handleCreatePayment, handleConfirmPayment, handleFailPayment } from "../controllers/payment_controller.js";

const router = Router();

router.post("/", protect, isUser, handleCreatePayment);
router.post("/confirm", protect, isUser, handleConfirmPayment);
router.post("/fail/:paymentId", protect, isUser, handleFailPayment);

export default router;