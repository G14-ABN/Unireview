import mongoose from "mongoose";
import "./loadEnvironment.js";
import app from "./server.js";

const PORT = 8080;

const connectionString = process.env.ATLAS_URI;
const databaseName = process.env.DB_NAME;

let server;

try {
  await mongoose.connect(connectionString, {
    dbName: databaseName,
  });
  console.log("Connessione al database per i test riuscita!");

  server = app.listen(PORT, () => {
    console.log("Test server is running on port 8080");
  });
} catch (error) {
  console.error(
    "Errore nella connessione al database per i test:",
    error.message
  );
  process.exit(1);
}

export default server;
