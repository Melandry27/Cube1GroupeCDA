import * as UserService from "../services/UserService";
import * as UserDB from "../database/UserDatabase";
import { IUser } from "../models/User";

jest.mock("../database/UserDatabase");

describe("UserService", () => {
  const mockUser: IUser = {
    _id: "user123",
    name: "John Doe",
    email: "john@example.com",
    password: "hashedpassword",
    roleId: "role123",
    adress: "123 Main St",
    phone: "1234567890",
    isVerified: false,
    validateEmail: false,
    validatePassword: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as unknown as IUser;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all users", async () => {
    (UserDB.getAllUsers as jest.Mock).mockResolvedValue([mockUser]);

    const result = await UserService.getAll();
    expect(result).toEqual([mockUser]);
    expect(UserDB.getAllUsers).toHaveBeenCalled();
  });

  it("should get user by id", async () => {
    (UserDB.getUserById as jest.Mock).mockResolvedValue(mockUser);

    const result = await UserService.getById("user123");
    expect(result).toEqual(mockUser);
    expect(UserDB.getUserById).toHaveBeenCalledWith("user123");
  });

  it("should get user by email", async () => {
    (UserDB.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);

    const result = await UserService.getByEmail("john@example.com");
    expect(result).toEqual(mockUser);
    expect(UserDB.getUserByEmail).toHaveBeenCalledWith("john@example.com");
  });

  it("should create a user", async () => {
    (UserDB.createUser as jest.Mock).mockResolvedValue(mockUser);

    const result = await UserService.create({
      name: mockUser.name,
      email: mockUser.email,
      password: mockUser.password,
      roleId: mockUser.roleId,
      adress: mockUser.adress,
      phone: mockUser.phone,
      isVerified: mockUser.isVerified,
    });

    expect(result).toEqual(mockUser);
    expect(UserDB.createUser).toHaveBeenCalled();
  });

  it("should update a user", async () => {
    (UserDB.updateUser as jest.Mock).mockResolvedValue({ ...mockUser, name: "Jane" });

    const result = await UserService.update("user123", { name: "Jane" });
    expect(result?.name).toBe("Jane");
    expect(UserDB.updateUser).toHaveBeenCalledWith("user123", { name: "Jane" });
  });

  it("should delete a user", async () => {
    (UserDB.deleteUser as jest.Mock).mockResolvedValue(mockUser);

    const result = await UserService.remove("user123");
    expect(result).toEqual(mockUser);
    expect(UserDB.deleteUser).toHaveBeenCalledWith("user123");
  });
});
