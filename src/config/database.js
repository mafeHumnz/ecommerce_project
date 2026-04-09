import mongoose from "mongoose";

export const conectarBD = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mi_base";

    await mongoose.connect(uri);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectado a MongoDB: ", error);
    process.exit(1);
  }
};

//1
