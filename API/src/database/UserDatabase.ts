import UserModel, { IUser } from "../models/User";

export const getAllUsers = async (): Promise<IUser[]> => {
  return UserModel.find();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return UserModel.findById(id);
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return UserModel.findOne({ email });
};

export const createUser = async (data: IUser): Promise<IUser> => {
  const user = new UserModel(data);
  return user.save();
};

export const updateUser = async (
  id: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  return UserModel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
  return UserModel.findByIdAndDelete(id);
};
