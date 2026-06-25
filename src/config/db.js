import mongoose from "mongoose";

export const conectarBD = async () => {
  try {
    const uri = process.env.MONGO_URI;

    await mongoose.connect(uri);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectado a MongoDB: ", error);
    process.exit(1);
  }
};
