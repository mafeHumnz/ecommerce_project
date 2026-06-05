import { Router } from "express";
import { createProductController, getProductsController } from "../controllers/product_controller.js";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductsController);

export default router;