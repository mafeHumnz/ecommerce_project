import { Router } from "express";
import { protect } from "../middlewares/protect_middleware.js";
import { isUser } from "../middlewares/auth_middleware.js";
import { getCartController, addItemController, removeItemController, updateItemController, clearCartController } from "../controllers/cart_controller.js";

const router = Router();

router.get("/", protect, isUser, getCartController);
router.post("/add", protect, isUser, addItemController);
router.delete("/remove/:productId", protect, isUser, removeItemController);
router.put("/update/:productId", protect, isUser, updateItemController);
router.delete("/clear", protect, isUser, clearCartController);

export default router;