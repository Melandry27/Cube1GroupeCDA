import * as RoleDB from "../database/RoleDatabase";
import { IRole } from "../models/Role";

export const getRoles = async (): Promise<IRole[]> => {
  return RoleDB.getAllRoles();
};

export const getRole = async (id: number): Promise<IRole | null> => {
  return RoleDB.getRoleById(id);
};

export const createNewRole = async (roleData: IRole): Promise<IRole> => {
  return RoleDB.createRole(roleData);
};

export const updateExistingRole = async (
  id: number,
  updateData: Partial<IRole>
): Promise<IRole | null> => {
  return RoleDB.updateRole(id, updateData);
};

export const deleteRoleById = async (id: number): Promise<IRole | null> => {
  return RoleDB.deleteRole(id);
};
