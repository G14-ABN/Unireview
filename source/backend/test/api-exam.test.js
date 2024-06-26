import request from "supertest";
import server from "../index.js";
import app from "../server.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import e from "express";

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

describe("Exam Routes", () => {
  describe("GET /api/exam", () => {
    it("should return all exams", async () => {
      const res = await request(app).get("/api/exam");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe("POST /api/exam", () => {
    it("should create a new exam if user is a moderator", async () => {
      const examData = {
        professore: "Testa",
        esame: "test",
      };

      const res = await request(app)
        .post("/api/exam")
        .set("Authorization", token)
        .send(examData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("_id");
    });
  });

  describe("GET /api/exam/professore/:professore", () => {
    it("should return exams by professor", async () => {
      const professore = "Testa";

      const res = await request(app).get(`/api/exam/professore/${professore}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    it("should return 404 if no exams found for the professor", async () => {
      const res = await request(app).get("/api/exam/professore/NonEsistente");

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty(
        "error",
        "Nessun esame trovaro per il professore selezionato"
      );
    });
  });

  describe("GET /api/exam/esame/:esame", () => {
    it("should return exams by name", async () => {
      const esame = "test";
      const res = await request(app).get(`/api/exam/esame/${esame}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it("should return 404 if no exams found for the name", async () => {
      const res = await request(app).get("/api/exam/esame/NonEsistente");

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty(
        "error",
        "Nessun esame trovaro per il nome selezionato"
      );
    });
  });

  describe("DELETE /api/exam/:esame", () => {
    it("should delete an exam by name if user is a moderator", async () => {
      const esame = "test";
      const res = await request(app)
        .delete(`/api/exam/${esame}`)
        .set("Authorization", token);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty(
        "message",
        "Esame eliminato con successo"
      );
    });

    it("should return 404 if exam is not found", async () => {
      const res = await request(app)
        .delete(`/api/exam/NonEsistente`)
        .set("Authorization", token);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Esame non trovato");
    });
  });
});
