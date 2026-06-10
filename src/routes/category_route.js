import { Router } from "express";
import { protect } from "../middlewares/jwt_protect.js";
import {isAdmin} from "../middlewares/auth.js";
import { createCategoryController, getCategoriesController, updateCategoryController, deleteCategoryController } from "../controllers/category_controller.js";

const router = Router();

router.post("/", protect, isAdmin, createCategoryController);
router.get("/", protect, isAdmin, getCategoriesController);
router.put("/:id", protect, isAdmin, updateCategoryController);
router.delete("/:id", protect, isAdmin, deleteCategoryController);

export default router;