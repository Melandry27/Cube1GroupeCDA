import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import * as RoleService from "../services/RoleService";

jest.mock("../services/RoleService");

describe("Role API", () => {
  const mongoUri =
    process.env.MONGO_URI_TEST || "mongodb://localhost:21017/testdb";

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.disconnect();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it("should create a new role", async () => {
    const roleData = { name: "Administrateur" };

    (RoleService.createNewRole as jest.Mock).mockResolvedValue({
      ...roleData,
      _id: new mongoose.Types.ObjectId().toString(),
    });

    const res = await request(app).post("/api/roles").send(roleData);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Administrateur");
    expect(res.body._id).toBeDefined();
    expect(RoleService.createNewRole).toHaveBeenCalledWith(roleData);
  });

  it("should get all roles", async () => {
    const roles = [
      { name: "Modérateur", _id: new mongoose.Types.ObjectId().toString() },
    ];

    (RoleService.getRoles as jest.Mock).mockResolvedValue(roles);

    const res = await request(app).get("/api/roles");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Modérateur");
    expect(RoleService.getRoles).toHaveBeenCalled();
  });

  it("should get role by id", async () => {
    const role = {
      name: "Super Admin",
      _id: new mongoose.Types.ObjectId().toString(),
    };

    (RoleService.getRole as jest.Mock).mockResolvedValue(role);

    const res = await request(app).get(`/api/roles/${role._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Super Admin");
    expect(res.body._id).toBe(role._id);
    expect(RoleService.getRole).toHaveBeenCalledWith(role._id);
  });

  it("should update a role", async () => {
    const roleId = new mongoose.Types.ObjectId().toString();
    const updatedRole = { name: "Citoyen Non Connecté" };

    (RoleService.updateExistingRole as jest.Mock).mockResolvedValue({
      ...updatedRole,
      _id: roleId,
    });

    const res = await request(app)
      .put(`/api/roles/${roleId}`)
      .send(updatedRole);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Citoyen Non Connecté");
    expect(res.body._id).toBe(roleId);
    expect(RoleService.updateExistingRole).toHaveBeenCalledWith(
      roleId,
      updatedRole
    );
  });

  it("should delete a role", async () => {
    const roleId = new mongoose.Types.ObjectId().toString();

    (RoleService.deleteRoleById as jest.Mock).mockResolvedValue({
      _id: roleId,
      name: "Citoyen Connecté",
    });

    const res = await request(app).delete(`/api/roles/${roleId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Role deleted successfully");
    expect(RoleService.deleteRoleById).toHaveBeenCalledWith(roleId);
  });

  it("should return 404 if role not found", async () => {
    const roleId = new mongoose.Types.ObjectId().toString();

    (RoleService.getRole as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get(`/api/roles/${roleId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Role not found");
    expect(RoleService.getRole).toHaveBeenCalledWith(roleId);
  });

  it("should handle server errors", async () => {
    (RoleService.createNewRole as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    const res = await request(app)
      .post("/api/roles")
      .send({ name: "Administrateur" });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Error creating role");
  });
});
