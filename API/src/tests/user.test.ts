import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("User API", () => {
  it("Devrait créer un utilisateur", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "123456",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe("John Doe");
  });
});
