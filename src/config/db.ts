import mongoose from "mongoose";
require("dotenv").config();

const connectDB = async (): Promise<void> => {
  try {
    const dbURI = process.env.MONGODB_URI || '';
    
    if (!dbURI) {
      throw new Error("URI do MongoDB não está definida.");
    }

    await mongoose.connect(dbURI);

    console.log("Conectado ao MongoDB");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB", err);
    process.exit(1); // Sai do processo com erro
  }
};

export default connectDB;
