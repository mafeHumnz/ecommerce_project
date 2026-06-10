import { Router } from "express";
import { protect } from "../middlewares/jwt_protect.js";
import {isAdmin} from "../middlewares/auth.js";
import { createProductController, getProductsController, getProductByIdController, updateProductController, deleteProductController } from "../controllers/product_controller.js";

const router = Router();

router.post("/", protect, isAdmin, createProductController);
router.get("/", protect, getProductsController);
router.get("/:id", protect, getProductByIdController);
router.put("/:id", protect, isAdmin, updateProductController);
router.delete("/:id", protect, isAdmin, deleteProductController);

export default router;