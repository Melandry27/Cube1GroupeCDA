import RoleModel, { IRole } from "../models/role.model";

export const getAllRoles = async (): Promise<IRole[]> => {
  return RoleModel.find();
};

export const getRoleById = async (id: number): Promise<IRole | null> => {
  return RoleModel.findOne({ id });
};

export const createRole = async (roleData: IRole): Promise<IRole> => {
  const role = new RoleModel(roleData);
  return role.save();
};

export const updateRole = async (
  id: number,
  updateData: Partial<IRole>
): Promise<IRole | null> => {
  return RoleModel.findOneAndUpdate({ id }, updateData, { new: true });
};

export const deleteRole = async (id: number): Promise<IRole | null> => {
  return RoleModel.findOneAndDelete({ id });
};
