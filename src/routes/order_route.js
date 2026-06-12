import { Router } from "express";
import { protect } from "../middlewares/protect_middleware.js";
import { isUser } from "../middlewares/auth_middleware.js";
import { createOrderController } from "../controllers/order_controller.js";

const router = Router();

router.post("/", protect, isUser, createOrderController);

export default router;