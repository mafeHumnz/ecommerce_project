import "dotenv/config";
import express from "express";
import productRoutes from "./routes/product_route.js";
import authRoutes from "./routes/auth_route.js";
import categoryRoutes from "./routes/category_route.js";

const app = express();

app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

export default app;