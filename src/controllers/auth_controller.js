import { loginUserService, registerUserService } from "../services/auth_service";

export const registerUserController = async (req, res) => {
    
    try {
        const user = await registerUserService(req.body);
        res.status(201).json({
            success: true,
            message: "Usuario registrado exitosamente",
            data: user
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message });
    }
};

export const loginUserController = async (req, res) => {

    try {
        const result = await loginUserService(req.body);
        res.status(200).json({
            success: true,
            message: "Login exitoso",
            data: result
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message });
    }
};