import mongoose from "mongoose";
import "./loadEnvironment.js";

const connect = async () => {
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

const disconnect = async () => {
  await mongoose.disconnect();
};

export default connect;
