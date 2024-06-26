import request from "supertest";
import server from "../index.js";
import app from "../server.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

let token;

beforeAll(async () => {
  token = jwt.sign(
    { email: "test@unireview.unitn.com", nomeUtente: "Test User" },
    process.env.JWT_SECRET,
    {
      expiresIn: "2m",
    }
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  if (server) {
    server.close();
  }
});

describe("Email API", () => {
  describe("POST /send-email", () => {
    it("should send an email", async () => {
      const res = await request(app)
        .post("/api/send-email")
        .set("Authorization", token)
        .send({ text: "Questo è un testo di prova" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Email inviata con successo");
    });

    it("should return 400 if text is missing", async () => {
      const res = await request(app)
        .post("/api/send-email")
        .set("Authorization", token)
        .send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty(
        "error",
        "Il testo dell'email è obbligatorio"
      );
    });

    it("should return 401 if no token is provided", async () => {
      const res = await request(app)
        .post("/api/send-email")
        .send({ text: "Questo è un testo di prova" });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty("error");
    });
  });
});
