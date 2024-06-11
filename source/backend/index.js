import express from "express";
import cors from "cors";
import reviewsRouter from "./routes/review.js";
import examRouter from "./routes/exam.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import connect from "./conn.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// Documentazione Swagger
const swaggerDocument = YAML.load("./api/openapi.yaml");

connect();

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Gestione delle rotte
app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth", authRouter);

// // Configura le route degli utenti
app.use("/api/user", userRouter);

// // Configura le route delle recensioni
app.use("/api/review", reviewsRouter);

app.use("/api/exam", examRouter);

// Gestione delle route non gestite
app.use((req, res) => {
  res.status(404).json({ error: "404 - Risorsa non trovata" });
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
