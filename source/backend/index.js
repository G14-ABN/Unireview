import mongoose from "mongoose";
import "./loadEnvironment.js";
import app from "./server.js";

const PORT = process.env.PORT;

const connectionString = process.env.ATLAS_URI;
const databaseName = process.env.DB_NAME;

let server;

try {
  await mongoose.connect(connectionString, {
    dbName: databaseName,
  });
  console.log("Connessione al database per i test riuscita!");

  server = app.listen(PORT, () => {
    console.log("Test server is running on port " + PORT);
  });
} catch (error) {
  /* istanbul ignore next */
  console.error(
    "Errore nella connessione al database per i test:",
    error.message
  );
  /* istanbul ignore next */
  process.exit(1);
}

export default server;
