import * as RoleService from "../services/RoleService";
import * as RoleDatabase from "../database/RoleDatabase";
import { IRole, RoleName } from "../models/Role";

jest.mock("../database/RoleDatabase");

const mockRole: IRole = {
  _id: "123",
  name: RoleName.Moderateur,
  slug: "moderateur",
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as IRole;

describe("RoleService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all roles", async () => {
    (RoleDatabase.getAllRoles as jest.Mock).mockResolvedValue([mockRole]);

    const result = await RoleService.getRoles();

    expect(RoleDatabase.getAllRoles).toHaveBeenCalled();
    expect(result).toEqual([mockRole]);
  });

  it("should get a role by ID", async () => {
    (RoleDatabase.getRoleById as jest.Mock).mockResolvedValue(mockRole);

    const result = await RoleService.getRole("123");

    expect(RoleDatabase.getRoleById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockRole);
  });

  it("should get a role by slug", async () => {
    (RoleDatabase.getRoleBySlug as jest.Mock).mockResolvedValue(mockRole);

    const result = await RoleService.getRoleBySlug("moderateur");

    expect(RoleDatabase.getRoleBySlug).toHaveBeenCalledWith("moderateur");
    expect(result).toEqual(mockRole);
  });

  it("should create a new role", async () => {
    (RoleDatabase.createRole as jest.Mock).mockResolvedValue(mockRole);

    const result = await RoleService.createNewRole({
      name: RoleName.Moderateur,
      slug: "moderateur",
    });

    expect(RoleDatabase.createRole).toHaveBeenCalledWith({
      name: RoleName.Moderateur,
      slug: "moderateur",
    });
    expect(result).toEqual(mockRole);
  });

  it("should update an existing role", async () => {
    (RoleDatabase.updateRole as jest.Mock).mockResolvedValue(mockRole);

    const result = await RoleService.updateExistingRole("123", {
      name: RoleName.Moderateur,
    });

    expect(RoleDatabase.updateRole).toHaveBeenCalledWith("123", {
      name: RoleName.Moderateur,
    });
    expect(result).toEqual(mockRole);
  });

  it("should delete a role by ID", async () => {
    (RoleDatabase.deleteRole as jest.Mock).mockResolvedValue(mockRole);

    const result = await RoleService.deleteRoleById("123");

    expect(RoleDatabase.deleteRole).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockRole);
  });
});