import mongoose from "mongoose";

export const conectarBD = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb+srv://ecommerce_admin:Chanchito@cluster0.ep5d74.mongodb.net/?appName=Cluster0";

    await mongoose.connect(uri);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectado a MongoDB: ", error);
    process.exit(1);
  }
};

//1
