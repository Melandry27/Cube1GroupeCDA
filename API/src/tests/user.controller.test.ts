import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import * as UserService from "../services/UserService";
import * as RoleService from "../services/RoleService";
import { IUser } from "../models/User";
import { connectToTestDb, disconnectFromTestDb } from "./setup";

jest.mock("../services/UserService");
jest.mock("../services/RoleService", () => ({
    getRole: jest.fn().mockResolvedValue({ name: "Super Admin" }),
  }));

describe("User Controller", () => {
  const userId = new mongoose.Types.ObjectId().toString();

  const mockUser: IUser = {
    _id: userId,
    name: "John Doe",
    email: "john@example.com",
    password: "hashedpassword",
    roleId: "role123",
    adress: "123 Street",
    phone: "0123456789",
    isVerified: false,
    validateEmail: false,
    validatePassword: false,
  } as IUser;

  beforeAll(async () => {
      await connectToTestDb();
  });

  afterAll(async () => {
      await disconnectFromTestDb();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user", async () => {
    (UserService.getByEmail as jest.Mock).mockResolvedValue(null);
    (UserService.create as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).post("/api/users").send({
      name: mockUser.name,
      email: mockUser.email,
      password: "plainpassword",
      roleId: mockUser.roleId,
      adress: mockUser.adress,
      phone: mockUser.phone,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe(mockUser.email);
    expect(UserService.create).toHaveBeenCalled();
  });

  it("should not create user if email already exists", async () => {
    (UserService.getByEmail as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).post("/api/users").send({
      email: mockUser.email,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Cet email est déjà utilisé.");
  });

  it("should get all users", async () => {
    (UserService.getAll as jest.Mock).mockResolvedValue([mockUser]);

    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].email).toBe(mockUser.email);
  });

  it("should get user by id", async () => {
    (UserService.getById as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(mockUser.email);
  });

  it("should return 404 if user not found by id", async () => {
    (UserService.getById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  it("should update a user", async () => {
    (UserService.update as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).put(`/api/users/${userId}`).send({ name: "Jane" });
    expect(res.statusCode).toBe(200);
    expect(UserService.update).toHaveBeenCalled();
  });

  it("should delete a user", async () => {
    (UserService.remove as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
  });

  it("should fetch members with roles and tokens", async () => {
    const mockUsers = [
      {
        _id: "user123",
        name: "Test User",
        email: "test@example.com",
        roleId: "role123",
        toObject: function () {
          return { ...this };
        },
      },
    ];

    (UserService.getAll as jest.Mock).mockResolvedValue(mockUsers);

    const res = await request(app).get("/api/users/members");

    expect(res.statusCode).toBe(200);
    expect(res.body.members.length).toBe(1);
    expect(res.body.message).toBe("Members fetched successfully");
  });
});
