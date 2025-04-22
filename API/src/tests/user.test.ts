import mongoose from "mongoose";
import * as UserDB from "../database/UserDatabase";
import { IUser } from "../models/User";
import * as UserService from "../services/UserService";

jest.mock("../database/UserDatabase");

describe("UserService", () => {
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

  const fakeUser: IUser = {
    _id: "661d21e4e2e8b3a2d5f54321",
    name: "Test User",
    email: "test@example.com",
    password: "hashedpassword",
    roleId: "user",
    adress: "123 rue du test",
    phone: "0600000000",
    isVerified: false,
    validateEmail: false,
    validatePassword: false,
  } as IUser;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all users", async () => {
    (UserDB.getAllUsers as jest.Mock).mockResolvedValue([fakeUser]);

    const result = await UserService.getAll();
    expect(result).toEqual([fakeUser]);
    expect(UserDB.getAllUsers).toHaveBeenCalledTimes(1);
  });

  it("should get user by ID", async () => {
    (UserDB.getUserById as jest.Mock).mockResolvedValue(fakeUser);

    const result = await UserService.getById("661d21e4e2e8b3a2d5f54321");
    expect(result).toEqual(fakeUser);
    expect(UserDB.getUserById).toHaveBeenCalledWith("661d21e4e2e8b3a2d5f54321");
  });

  it("should get user by email", async () => {
    (UserDB.getUserByEmail as jest.Mock).mockResolvedValue(fakeUser);

    const result = await UserService.getByEmail("test@example.com");
    expect(result).toEqual(fakeUser);
    expect(UserDB.getUserByEmail).toHaveBeenCalledWith("test@example.com");
  });

  it("should create a user", async () => {
    (UserDB.createUser as jest.Mock).mockResolvedValue(fakeUser);

    const result = await UserService.create({
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword",
      roleId: "user",
      adress: "123 rue du test",
      phone: "0600000000",
      isVerified: false,
    });

    expect(result).toEqual(fakeUser);
    expect(UserDB.createUser).toHaveBeenCalledWith({
      name: "Test User",
      email: "test@example.com",
      password: "hashedpassword",
      roleId: "user",
      adress: "123 rue du test",
      phone: "0600000000",
      isVerified: false,
    });
  });

  it("should update a user", async () => {
    const updatedUser = { ...fakeUser, name: "Updated Name" };
    (UserDB.updateUser as jest.Mock).mockResolvedValue(updatedUser);

    const result = await UserService.update("661d21e4e2e8b3a2d5f54321", {
      name: "Updated Name",
    });

    expect(result).toEqual(updatedUser);
    expect(UserDB.updateUser).toHaveBeenCalledWith("661d21e4e2e8b3a2d5f54321", {
      name: "Updated Name",
    });
  });

  it("should delete a user", async () => {
    (UserDB.deleteUser as jest.Mock).mockResolvedValue(fakeUser);

    const result = await UserService.remove("661d21e4e2e8b3a2d5f54321");

    expect(result).toEqual(fakeUser);
    expect(UserDB.deleteUser).toHaveBeenCalledWith("661d21e4e2e8b3a2d5f54321");
  });
});
