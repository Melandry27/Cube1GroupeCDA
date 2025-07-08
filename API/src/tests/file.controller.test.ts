import request from "supertest";
import app from "../app";
import * as ProgressService from "../services/ProgressService";
import { IProgress, ProgressStatus } from "../models/Progress";
import mongoose from "mongoose";

jest.mock("../services/ProgressService");

const mockProgress: IProgress = {
  _id: new mongoose.Types.ObjectId().toString(),
  userId: "user123",
  ressourceId: "ressource123",
  status: ProgressStatus.InProgress,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as IProgress;

describe("Progress Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("POST /api/progress - should create a progress", async () => {
    (ProgressService.createProgress as jest.Mock).mockResolvedValue(
      mockProgress
    );

    const res = await request(app).post("/api/progress").send(mockProgress);

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      userId: "user123",
      status: ProgressStatus.InProgress,
    });
    expect(ProgressService.createProgress).toHaveBeenCalled();
  });

  it("GET /api/progress - should return all progress", async () => {
    (ProgressService.getAllProgress as jest.Mock).mockResolvedValue([
      mockProgress,
    ]);

    const res = await request(app).get("/api/progress");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(ProgressService.getAllProgress).toHaveBeenCalled();
  });

  it("GET /api/progress/:id - should return progress by ID", async () => {
    (ProgressService.getProgressById as jest.Mock).mockResolvedValue(
      mockProgress
    );

    const res = await request(app).get(`/api/progress/${mockProgress._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.userId).toBe("user123");
  });

  it("PUT /api/progress/:id - should update a progress", async () => {
    const updated = { ...mockProgress, status: ProgressStatus.Completed };
    (ProgressService.updateProgress as jest.Mock).mockResolvedValue(updated);

    const res = await request(app)
      .put(`/api/progress/${mockProgress._id}`)
      .send({ status: ProgressStatus.Completed });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(ProgressStatus.Completed);
    expect(ProgressService.updateProgress).toHaveBeenCalled();
  });

  it("DELETE /api/progress/:id - should delete a progress", async () => {
    (ProgressService.deleteProgress as jest.Mock).mockResolvedValue(
      mockProgress
    );

    const res = await request(app).delete(`/api/progress/${mockProgress._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Progress deleted successfully");
    expect(ProgressService.deleteProgress).toHaveBeenCalledWith(
      mockProgress._id
    );
  });

  it("GET /api/progress/:id - should return 404 if progress not found", async () => {
    (ProgressService.getProgressById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/api/progress/unknown-id");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Progress not found");
  });
});
