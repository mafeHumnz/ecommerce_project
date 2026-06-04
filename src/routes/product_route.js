import { Router } from "express";
import { createProduct, getProducts } from "../controllers/product_controller.js";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);

export default router;