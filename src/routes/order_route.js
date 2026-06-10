import { Router } from "express";
import { protect } from "../middlewares/jwt_protect.js";
import { isUser } from "../middlewares/auth.js";
import { createOrderController } from "../controllers/order_controller.js";

const router = Router();

router.post("/", protect, isUser, createOrderController);

export default router;