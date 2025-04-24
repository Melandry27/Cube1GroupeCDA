import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import { connectToTestDb, disconnectFromTestDb } from "./setup";
import { ProgressStatus } from "../models/Progress";

let createdId: string;

beforeAll(async () => {
  await connectToTestDb();
});

afterAll(async () => {
  await disconnectFromTestDb();
});

describe("Progress API", () => {
  it("should create a progress record", async () => {
    const res = await request(app).post("/api/progress").send({
      userId: "user123",
      ressourceId: "ressource123",
      status: ProgressStatus.InProgress,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.status).toBe(ProgressStatus.InProgress);
    createdId = res.body._id;
  });

  it("should fetch all progress records", async () => {
    const res = await request(app).get("/api/progress");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should fetch a progress record by ID", async () => {
    const res = await request(app).get(`/api/progress/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(createdId);
  });

  it("should update a progress record", async () => {
    const res = await request(app).put(`/api/progress/${createdId}`).send({
      status: ProgressStatus.Completed,
    });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(ProgressStatus.Completed);
  });

  it("should delete a progress record", async () => {
    const res = await request(app).delete(`/api/progress/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Progress deleted successfully");
  });

  it("should return 404 for deleted progress record", async () => {
    const res = await request(app).get(`/api/progress/${createdId}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Progress not found");
  });
});