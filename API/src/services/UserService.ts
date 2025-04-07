import * as UserDB from "../database/UserDatabase";
import { IUser } from "../models/User";

export const getAll = async (): Promise<IUser[]> => {
  return UserDB.getAllUsers();
};

export const getById = async (id: string): Promise<IUser | null> => {
  return UserDB.getUserById(id);
};

export const getByEmail = async (email: string): Promise<IUser | null> => {
  return UserDB.getUserByEmail(email);
};

export const create = async (data: IUser): Promise<IUser> => {
  return UserDB.createUser(data);
};

export const update = async (
  id: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  return UserDB.updateUser(id, updateData);
};

export const remove = async (id: string): Promise<IUser | null> => {
  return UserDB.deleteUser(id);
};
