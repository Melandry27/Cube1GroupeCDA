import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import * as StatisticService from "../services/StatisticService";
import { IStatistic } from "../models/Statistic";
import { connectToTestDb, disconnectFromTestDb } from "./setup";

jest.mock("../services/StatisticService");

describe("Statistic Controller", () => {
  const mockStat: IStatistic = {
    id: "stat123",
    ressourceId: "res123",
    views: 100,
    favorites: 50,
    shares: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as unknown as IStatistic;

   beforeAll(async () => {
      await connectToTestDb();
    });
    
    afterAll(async () => {
      await disconnectFromTestDb();
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a statistic", async () => {
    (StatisticService.create as jest.Mock).mockResolvedValue(mockStat);

    const res = await request(app).post("/api/statistics").send(mockStat);

    expect(res.status).toBe(201);
    expect(res.body.id).toBe("stat123");
    expect(StatisticService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mockStat.id,
        ressourceId: mockStat.ressourceId,
        views: mockStat.views,
        favorites: mockStat.favorites,
        shares: mockStat.shares,
      })
    );
  });

  it("should get all statistics", async () => {
    (StatisticService.getAll as jest.Mock).mockResolvedValue([mockStat]);

    const res = await request(app).get("/api/statistics");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(StatisticService.getAll).toHaveBeenCalled();
  });

  it("should return 404 if no statistics are found", async () => {
    (StatisticService.getAll as jest.Mock).mockResolvedValue([]);

    const res = await request(app).get("/api/statistics");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("No statistics found");
  });

  it("should get a statistic by ID", async () => {
    (StatisticService.getById as jest.Mock).mockResolvedValue(mockStat);

    const res = await request(app).get("/api/statistics/stat123");

    expect(res.status).toBe(200);
    expect(res.body.id).toBe("stat123");
    expect(StatisticService.getById).toHaveBeenCalledWith("stat123");
  });

  it("should return 404 if statistic not found by ID", async () => {
    (StatisticService.getById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/api/statistics/stat999");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Statistic not found");
  });

  it("should update a statistic", async () => {
    const update = { views: 200 };
    const updatedStat = { ...mockStat, ...update };

    (StatisticService.update as jest.Mock).mockResolvedValue(updatedStat);

    const res = await request(app)
      .put("/api/statistics/stat123")
      .send(update);

    expect(res.status).toBe(200);
    expect(res.body.views).toBe(200);
    expect(StatisticService.update).toHaveBeenCalledWith("stat123", update);
  });

  it("should delete a statistic", async () => {
    (StatisticService.remove as jest.Mock).mockResolvedValue(mockStat);

    const res = await request(app).delete("/api/statistics/stat123");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Statistic deleted successfully");
    expect(StatisticService.remove).toHaveBeenCalledWith("stat123");
  });

  it("should return 404 when deleting a non-existent statistic", async () => {
    (StatisticService.remove as jest.Mock).mockResolvedValue(null);

    const res = await request(app).delete("/api/statistics/stat404");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Statistic not found");
  });
});