import "dotenv/config";
import express from "express";
import productRoutes from "./routes/product_route.js";

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

export default app;