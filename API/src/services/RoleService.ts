import * as RoleDB from "../database/RoleDatabase";
import { IRole, IRoleInput } from "../models/Role";

export const getRoles = async (): Promise<IRole[]> => {
  return RoleDB.getAllRoles();
};

export const getRole = async (id: string): Promise<IRole | null> => {
  return RoleDB.getRoleById(id);
};

export const getRoleBySlug = async (slug: string): Promise<IRole | null> => {
  return RoleDB.getRoleBySlug(slug);
};

export const createNewRole = async (roleData: IRoleInput): Promise<IRole> => {
  return RoleDB.createRole(roleData);
};

export const updateExistingRole = async (
  id: string,
  updateData: Partial<IRole>
): Promise<IRole | null> => {
  return RoleDB.updateRole(id, updateData);
};

export const deleteRoleById = async (id: string): Promise<IRole | null> => {
  return RoleDB.deleteRole(id);
};
