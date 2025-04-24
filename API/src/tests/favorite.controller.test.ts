import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import { connectToTestDb, disconnectFromTestDb } from "./setup";

const mockFavoriteData = {
  userId: "user123",
  ressourceId: "res123",
};

describe("Favorite Controller", () => {
  let createdId: string;

  beforeAll(async () => {
    await connectToTestDb();
  });

  afterAll(async () => {
    await disconnectFromTestDb();
  });

  it("should create a new favorite", async () => {
    const res = await request(app)
      .post("/api/favorites")
      .send(mockFavoriteData);

    expect(res.statusCode).toBe(201);
    expect(res.body.userId).toBe(mockFavoriteData.userId);
    expect(res.body.ressourceId).toBe(mockFavoriteData.ressourceId);
    expect(res.body.isFavorited).toBe(true);

    createdId = res.body._id;
  });

  it("should toggle favorite if exists", async () => {
    const res = await request(app)
      .post("/api/favorites")
      .send(mockFavoriteData);

    expect(res.statusCode).toBe(200);
    expect(res.body.isFavorited).toBe(false);
  });

  it("should get all favorites", async () => {
    const res = await request(app).get("/api/favorites");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a favorite by id", async () => {
    const res = await request(app).get(`/api/favorites/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdId);
  });

  it("should update a favorite", async () => {
    const res = await request(app)
      .put(`/api/favorites/${createdId}`)
      .send({ isFavorited: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.isFavorited).toBe(true);
  });

  it("should delete a favorite", async () => {
    const res = await request(app).delete(`/api/favorites/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Favorite deleted successfully");
  });
});
