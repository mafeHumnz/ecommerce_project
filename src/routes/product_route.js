import { Router } from "express";
import { createProductController, getProductsController, getProductByIdController, updateProductController, deleteProductController } from "../controllers/product_controller.js";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductsController);
router.get("/:id", getProductByIdController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;