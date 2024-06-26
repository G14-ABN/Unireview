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

describe("User Routes", () => {
  describe("GET /api/user", () => {
    it("should return all users if requester is a moderator", async () => {
      const res = await request(app)
        .get("/api/user")
        .set("Authorization", token);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/user/:email", () => {
    it("should return user details if requester is the same user or a moderator", async () => {
      const res = await request(app)
        .get("/api/user/test@unireview.unitn.com")
        .set("Authorization", token);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("email", "test@unireview.unitn.com");
    });

    it("should return 404 if user is not found", async () => {
      const res = await request(app)
        .get("/api/user/nonexistent@example.com")
        .set("Authorization", token);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Utente non trovato");
    });
  });

  describe("PATCH /api/user/:email", () => {
    it("should update user details if requester is a moderator", async () => {
      const updateData = { nomeUtente: "Test User" };
      const res = await request(app)
        .patch("/api/user/test@unireview.unitn.com")
        .set("Authorization", token)
        .send(updateData);

      expect(res.statusCode).toEqual(200);
    });

    it("should return 404 if user is not found", async () => {
      const updateData = { nomeUtente: "Updated User" };
      const res = await request(app)
        .patch("/api/user/nonexistent@example.com")
        .set("Authorization", token)
        .send(updateData);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Utente non trovato");
    });
  });

  describe("PUT /api/user/language", () => {
    it("should update user language if authenticated", async () => {
      const updateData = { linguaUI: true };
      const res = await request(app)
        .put("/api/user/language")
        .set("Authorization", token)
        .send(updateData);

      expect(res.statusCode).toEqual(200);
    });

    describe("PUT /api/user/theme", () => {
      it("should update user theme if authenticated", async () => {
        const updateData = { temaUI: true };
        const res = await request(app)
          .put("/api/user/theme")
          .set("Authorization", token)
          .send(updateData);

        expect(res.statusCode).toEqual(200);
      });
    });
  });

  describe("DELETE /api/user/:email", () => {
    it("should return 404 if user is not found", async () => {
      const res = await request(app)
        .delete("/api/user/nonexistent@example.com")
        .set("Authorization", token);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Utente non trovato");
    });
  });

  describe("PATCH /api/user/revoke-moderator/:email", () => {
    it("should revoke moderator privileges if requester is a moderator", async () => {
      const res = await request(app)
        .patch("/api/user/revoke-moderator/unireview.unitn@gmail.com")
        .set("Authorization", token);

      expect(res.statusCode).toEqual(200);
    });

    it("should return 404 if user is not found", async () => {
      const res = await request(app)
        .patch("/api/user/revoke-moderator/nonexistent@example.com")
        .set("Authorization", token);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Utente non trovato");
    });
  });

  describe("PATCH /api/user/promote-moderator/:email", () => {
    it("should promote a user to moderator if requester is a moderator", async () => {
      const res = await request(app)
        .patch("/api/user/promote-moderator/unireview.unitn@gmail.com")
        .set("Authorization", token);

      expect(res.statusCode).toEqual(200);
    });

    it("should return 404 if user is not found", async () => {
      const res = await request(app)
        .patch("/api/user/promote-moderator/nonexistent@example.com")
        .set("Authorization", token);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Utente non trovato");
    });
  });

  describe("PATCH /api/user/ban/:email", () => {
    it("should ban a user for a specified number of days if requester is a moderator", async () => {
      const res = await request(app)
        .patch("/api/user/ban/test@unireview.unitn.com")
        .set("Authorization", token)
        .send({ days: 7 });

      expect(res.statusCode).toEqual(200);
    });

    it("should return 400 if the number of days is invalid", async () => {
      const res = await request(app)
        .patch("/api/user/ban/test@unireview.unitn.com")
        .set("Authorization", token)
        .send({ days: -1 });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty(
        "error",
        "Il numero di giorni deve essere un numero positivo."
      );
    });

    it("should return 404 if user is not found", async () => {
      const res = await request(app)
        .patch("/api/user/ban/nonexistent@example.com")
        .set("Authorization", token)
        .send({ days: 7 });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("error", "Utente non trovato");
    });
  });

  describe("PATCH /api/user/unban/:email", () => {
    it("should unban a user if requester is a moderator", async () => {
      const res = await request(app)
        .patch("/api/user/unban/test@unireview.unitn.com")
        .set("Authorization", token);
    });
  });
});
