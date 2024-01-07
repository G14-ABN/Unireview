import mongoose from "mongoose";
import "./loadEnvironment.js";

const connectDB = async () => {
  try {
    const connectionString = process.env.ATLAS_URI;
    const databaseName = process.env.DB_NAME;
    await mongoose.connect(connectionString, {
      dbName: databaseName,
    });
    console.log("Connessione al database riuscita!");
  } catch (error) {
    console.error("Errore nella connessione al database:", error.message);
    process.exit(1);
  }
};

export default connectDB;