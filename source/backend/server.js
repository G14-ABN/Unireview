import express from "express";
import cors from "cors";
import reviewRouter from "./routes/review.js";
import examRouter from "./routes/exam.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import emailRoutes from "./routes/email.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// Documentazione Swagger
const swaggerDocument = YAML.load("./api/openapi.yaml");

const app = express();

app.use(cors());
app.use(express.json());

// Gestione delle rotte
// app.get("/", (req, res) => {
//   res.send("Homepage");
// });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth", authRouter);

app.use("/api/send-email", emailRoutes);

// // Configura le route degli utenti
app.use("/api/user", userRouter);

// // Configura le route delle recensioni
app.use("/api/review", reviewRouter);

// // Configura le route degli esami
app.use("/api/exam", examRouter);

// Gestione delle route non gestite
app.use((req, res) => {
  res.status(404).json({ error: "404 - Risorsa non trovata" });
});

export default app;
