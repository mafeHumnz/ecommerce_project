import { Router } from "express";
import { protect } from "../middlewares/jwt_protect.js";
import {isAdmin} from "../middlewares/admin_auth.js";
import { createProductController, getProductsController, getProductByIdController, updateProductController, deleteProductController } from "../controllers/product_controller.js";

const router = Router();

router.post("/", protect, isAdmin, createProductController);
router.get("/", protect, isAdmin, getProductsController);
router.get("/:id", protect, isAdmin, getProductByIdController);
router.put("/:id", protect, isAdmin, updateProductController);
router.delete("/:id", protect, isAdmin, deleteProductController);

export default router;