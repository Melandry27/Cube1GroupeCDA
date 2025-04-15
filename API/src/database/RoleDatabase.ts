import RoleModel, { IRole } from "../models/Role";

export const getAllRoles = async (): Promise<IRole[]> => {
  return RoleModel.find();
};

export const getRoleById = async (id: string): Promise<IRole | null> => {
  return RoleModel.findOne({ _id: id });
};

export const createRole = async (roleData: IRole): Promise<IRole> => {
  const role = new RoleModel(roleData);
  return role.save();
};

export const updateRole = async (
  id: string,
  updateData: Partial<IRole>
): Promise<IRole | null> => {
  return RoleModel.findOneAndUpdate({ _id: id }, updateData, { new: true });
};

export const deleteRole = async (id: string): Promise<IRole | null> => {
  return RoleModel.findOneAndDelete({ _id: id });
};
