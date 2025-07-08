import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import * as RessourceService from "../services/RessourceService";
import { IRessource, RessourceType } from "../models/Ressource";
import { connectToTestDb, disconnectFromTestDb } from "./setup";

jest.mock("../services/RessourceService");

const mockRessource: IRessource = {
  _id: new mongoose.Types.ObjectId().toString(),
  title: "Test Ressource",
  content: "Content here",
  type: RessourceType.Completed,
  createdBy: "user123",
  categoryId: new mongoose.Types.ObjectId(),
  image: "test.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as IRessource;

beforeAll(async () => {
  await connectToTestDb();
});

afterAll(async () => {
  await disconnectFromTestDb();
});

describe("Ressource Controller", () => {
  afterEach(() => jest.clearAllMocks());

  it("should create a new ressource", async () => {
    (RessourceService.create as jest.Mock).mockResolvedValue(mockRessource);

    const res = await request(app)
      .post("/api/ressources")
      .send(mockRessource);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Ressource");
    expect(RessourceService.create).toHaveBeenCalled();
  });

  it("should get all ressources", async () => {
    (RessourceService.getAll as jest.Mock).mockResolvedValue([mockRessource]);

    const res = await request(app).get("/api/ressources");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]._id).toBe(mockRessource._id);
  });

  it("should get a ressource by ID", async () => {
    (RessourceService.getById as jest.Mock).mockResolvedValue(mockRessource);

    const res = await request(app).get(`/api/ressources/${mockRessource._id}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(mockRessource._id);
  });

  it("should return 404 if ressource not found", async () => {
    (RessourceService.getById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/api/ressources/unknown-id");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Resource not found");
  });

  it("should update a ressource", async () => {
    const updated = { ...mockRessource, title: "Updated title" };
    (RessourceService.update as jest.Mock).mockResolvedValue(updated);

    const res = await request(app)
      .put(`/api/ressources/${mockRessource._id}`)
      .send({ title: "Updated title" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated title");
  });

  it("should delete a ressource", async () => {
    (RessourceService.remove as jest.Mock).mockResolvedValue(mockRessource);

    const res = await request(app).delete(`/api/ressources/${mockRessource._id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Resource deleted successfully");
  });
});
