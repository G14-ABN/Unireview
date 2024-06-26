import request from "supertest";
import server from "../index.js";
import app from "../server.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

beforeAll(async () => {});

afterAll(async () => {
  await mongoose.disconnect();
  if (server) {
    server.close();
  }
});

describe("Unknown Route", () => {
  it("should return 404 for unknown route", async () => {
    const res = await request(app).get("/unknown-route");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "404 - Risorsa non trovata");
  });
});

describe("Auth API", () => {
  // Test per la rotta /test
  describe("GET /test", () => {
    it("should return access message for authenticated user", async () => {
      const token = jwt.sign(
        { email: "test@unireview.unitn.com", nomeUtente: "Test User" },
        process.env.JWT_SECRET,
        {
          expiresIn: "2m",
        }
      );

      const res = await request(app)
        .get("/auth/test")
        .set("Authorization", token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(
        "message",
        "You have access to the protected route!"
      );
      expect(res.body).toHaveProperty("user");
    });

    it("should return 401 for unauthenticated user", async () => {
      const res = await request(app).get("/auth/test");
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty(
        "error",
        "Token mancante, autorizzazione negata"
      );
    });

    describe("GET /auth/google", () => {
      it("should redirect to Google for authentication", async () => {
        const res = await request(app).get("/auth/google");
        expect(res.statusCode).toBe(302); // Assuming it redirects to Google
        expect(res.header.location).toContain("accounts.google.com");
      });
    });
  });
});
