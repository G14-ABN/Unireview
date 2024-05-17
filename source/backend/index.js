import express from "express";
import cors from "cors";
import reviewsRouter from "./routes/reviews.js";
import examsRouter from "./routes/exams.js";
import usersRouter from "./routes/users.js";
import connect from "./conn.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

connect();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load("./api/openapi.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // Global error handling
// app.use((err, _req, res, next) => {
//   res.status(500).send("Uh oh! An unexpected error occured.");
// });

// // Configura le route delle recensioni
// app.use("/api", reviewsRouter);


// // Configura le route degli utenti
app.use("/api", usersRouter);

// // Configura le route delle recensioni
app.use("/api", reviewsRouter);

app.use("/api", examsRouter);

// Gestione delle route non gestite
app.use((req, res) => {
  res.status(404).json({ error: "Route non trovata" });
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
