import { Router } from "express";
import { registerValidation, loginValidation } from "../validators/auth_validator.js";
import { validateRequest } from "../middlewares/validate_middleware.js";
import { loginUserController, registerUserController } from "../controllers/auth_controller.js";

const router = Router();

router.post("/register", registerValidation, validateRequest, registerUserController);
router.post("/login", loginValidation, validateRequest, loginUserController);

export default router;