import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Leer header Authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No hay token, acceso denegado",
      });
    }

    // 2. Verificar token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 3. Buscar usuario en BD
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    // 4. Adjuntar usuario al request
    req.user = user;

    next();
  } catch (error) {

    console.error("ERROR JWT:", error);
    
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
};