export const isAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {

       return res.status(403).json({ 
        success: false,
        message: "Acceso denegado. No eres un administrador." });
    }
    next();
};