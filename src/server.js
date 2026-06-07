import app from "./app.js";
import { conectarBD } from "./config/database.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await conectarBD();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();