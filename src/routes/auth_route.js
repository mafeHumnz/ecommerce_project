import { Router } from "express";
import { loginUserController, registerUserController } from "../controllers/auth_controller.js";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);

export default router;