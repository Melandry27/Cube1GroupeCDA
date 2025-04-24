import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import { connectToTestDb, disconnectFromTestDb } from "./setup";
import Category from "../models/Category";

describe("CategoryController", () => {
  let createdId: string;

  beforeAll(async () => {
    await connectToTestDb();
  });

  afterAll(async () => {
    await disconnectFromTestDb();
  });

  afterEach(async () => {
    await Category.deleteMany(); // Nettoie après chaque test
  });

  it("should create a category", async () => {
    const categoryData = {
      name: "Environnement",
      description: "Catégorie liée à l'environnement",
      color: "#00FF00",
    };

    const res = await request(app).post("/api/categories").send(categoryData);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Environnement");

    createdId = res.body._id;
  });

  it("should get all categories", async () => {
    await Category.create({
      name: "Culture",
      description: "Arts et culture",
    });

    const res = await request(app).get("/api/categories");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get category by id", async () => {
    const category = await Category.create({
      name: "Santé",
      description: "Informations santé",
    });

    const res = await request(app).get(`/api/categories/${category._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Santé");
  });

  it("should update a category", async () => {
    const category = await Category.create({
      name: "Sport",
      description: "Activité physique",
    });

    const res = await request(app)
      .put(`/api/categories/${category._id}`)
      .send({ name: "Sports et Loisirs" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Sports et Loisirs");
  });

  it("should delete a category", async () => {
    const category = await Category.create({
      name: "TestDelete",
      description: "À supprimer",
    });

    const res = await request(app).delete(`/api/categories/${category._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Category deleted successfully");
  });

  it("should return 404 for non-existent category", async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();

    const res = await request(app).get(`/api/categories/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Category not found");
  });
});