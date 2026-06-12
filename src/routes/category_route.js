import { Router } from "express";
import { protect } from "../middlewares/protect_middleware.js";
import {isAdmin} from "../middlewares/auth_middleware.js";
import { createCategoryValidator, updateCategoryValidator } from "../validators/category_validator.js";
import { validateRequest } from "../middlewares/validate_middleware.js";
import { createCategoryController, getCategoriesController, updateCategoryController, deleteCategoryController } from "../controllers/category_controller.js";

const router = Router();

router.post("/", protect, isAdmin, createCategoryValidator, validateRequest, createCategoryController);
router.get("/", protect, isAdmin, getCategoriesController);
router.put("/:id", protect, isAdmin, updateCategoryValidator, validateRequest, updateCategoryController);
router.delete("/:id", protect, isAdmin, deleteCategoryController);

export default router;