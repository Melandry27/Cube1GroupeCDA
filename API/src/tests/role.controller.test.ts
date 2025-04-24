import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import * as RoleService from "../services/RoleService";
import { RoleName } from "../models/Role";
import { connectToTestDb, disconnectFromTestDb } from "./setup";

jest.mock("../services/RoleService");

describe("Role Controller", () => {
  const roleMock = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: RoleName.Administrateur,
    slug: "administrateur",
  };

  beforeAll(async () => {
    await connectToTestDb();
  });
  
  afterAll(async () => {
    await disconnectFromTestDb();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("POST /api/roles - should create a new role", async () => {
    (RoleService.getRoleBySlug as jest.Mock).mockResolvedValue(null);
    (RoleService.createNewRole as jest.Mock).mockResolvedValue(roleMock);

    const res = await request(app).post("/api/roles").send({ name: RoleName.Administrateur });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(RoleName.Administrateur);
    expect(RoleService.getRoleBySlug).toHaveBeenCalledWith("administrateur");
    expect(RoleService.createNewRole).toHaveBeenCalledWith({ name: RoleName.Administrateur, slug: "administrateur" });
  });

  it("GET /api/roles - should return all roles", async () => {
    (RoleService.getRoles as jest.Mock).mockResolvedValue([roleMock]);

    const res = await request(app).get("/api/roles");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name).toBe(RoleName.Administrateur);
  });

  it("GET /api/roles/:id - should return a role by ID", async () => {
    (RoleService.getRole as jest.Mock).mockResolvedValue(roleMock);

    const res = await request(app).get(`/api/roles/${roleMock._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(RoleName.Administrateur);
  });

  it("PUT /api/roles/:id - should update a role", async () => {
    (RoleService.updateExistingRole as jest.Mock).mockResolvedValue({ ...roleMock, name: RoleName.Moderateur });

    const res = await request(app).put(`/api/roles/${roleMock._id}`).send({ name: RoleName.Moderateur });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(RoleName.Moderateur);
  });

  it("DELETE /api/roles/:id - should delete a role", async () => {
    (RoleService.deleteRoleById as jest.Mock).mockResolvedValue(roleMock);

    const res = await request(app).delete(`/api/roles/${roleMock._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Role deleted successfully");
  });
});
