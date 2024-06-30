import request from "supertest";
import server from "../index.js";
import app from "../server.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

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

describe("Review API", () => {
  describe("GET /review", () => {
    it("should return all reviews", async () => {
      const res = await request(app).get("/api/review");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /review/:email", () => {
    it("should return all reviews for a specific user", async () => {
      const email = "unireview.unitn@gmail.com";
      const res = await request(app).get(`/api/review/${email}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    it("should return 404 if no reviews found for the user", async () => {
      const email = "nonexistent@example.com";
      const res = await request(app).get(`/api/review/${email}`);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty(
        "error",
        "Nessuna recensione trovata per questo utente"
      );
    });
  });

  describe("GET /review/professore/:professore", () => {
    it("should return all reviews for a specific professor", async () => {
      const professore = "Romeo Brunetti";
      const res = await request(app).get(
        `/api/review/professore/${professore}`
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    it("should return 404 if no reviews found for the professor", async () => {
      const professore = "Non Existent";
      const res = await request(app).get(
        `/api/review/professore/${professore}`
      );
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty(
        "error",
        "Nessuna recensione trovata per questo professore"
      );
    });
  });

  describe("GET /review/esame/:esame", () => {
    it("should return all reviews for a specific exam", async () => {
      const esame = "Analisi 1";
      const res = await request(app).get(`/api/review/esame/${esame}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    it("should return 404 if no reviews found for the exam", async () => {
      const esame = "NonEsisteQuestoEsame";
      const res = await request(app).get(`/api/review/esame/${esame}`);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty(
        "error",
        "Nessuna recensione trovata per questo esame"
      );
    });
  });

  let reviewId;

  describe("POST /api/review", () => {
    it("should create a new review", async () => {
      const reviewData = {
        professore: "Test",
        esame: "Test",
        valutazioneProfessore: 5,
        valutazioneFattibilita: 4,
        valutazioneMateriale: 3,
        testo: "Test review.",
        tentativo: 1,
        voto: 30,
        frequenza: "<50%",
        anonima: false,
      };

      const res = await request(app)
        .post("/api/review")
        .set("Authorization", token)
        .send(reviewData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("_id");
      reviewId = res.body._id;
    });

    it("should return 400 if review data is invalid", async () => {
      const res = await request(app)
        .post("/api/review")
        .set("Authorization", token)
        .send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty(
        "error",
        "Errore nell'inserimento dei dati"
      );
    });
  });

  describe("PATCH /api/review/:reviewId", () => {
    it("should update a review by ID", async () => {
      const updateData = {
        professore: "Test",
        esame: "Test",
        valutazioneProfessore: 5,
        valutazioneFattibilita: 4,
        valutazioneMateriale: 3,
        testo: "Test review.",
        tentativo: 1,
        voto: 30,
        frequenza: "Nessuna",
        anonima: true,
      };

      const res = await request(app)
        .patch(`/api/review/${reviewId}`)
        .set("Authorization", token)
        .send(updateData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("anonima", true);
    });

    it("should return 404 if review is not found", async () => {
      const updateData = {
        professore: "Test",
        esame: "Test",
        valutazioneProfessore: 5,
        valutazioneFattibilita: 4,
        valutazioneMateriale: 3,
        testo: "Test review.",
        tentativo: 1,
        voto: 30,
        frequenza: "Nessuna",
        anonima: false,
      };

      const res = await request(app)
        .patch("/api/review/60d5ec59f1b1bc20a8d7a3e9")
        .set("Authorization", token)
        .send(updateData);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Recensione non trovata");
    });
  });

  describe("DELETE /api/review/:reviewId", () => {
    it("should delete a review by ID", async () => {
      const res = await request(app)
        .delete(`/api/review/${reviewId}`)
        .set("Authorization", token);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty(
        "message",
        "Recensione eliminata con successo"
      );
    });

    it("should return 404 if review is not found", async () => {
      const res = await request(app)
        .delete("/api/review/60d5ec59f1b1bc20a8d7a3e9")
        .set("Authorization", token);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Recensione non trovata");
    });
  });
});
