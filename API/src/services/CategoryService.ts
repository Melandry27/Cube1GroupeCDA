import * as CategoryDatabase from "../database/CategoryDatabase";
import { ICategory } from "../models/Category";

export const create = async (
  categoryData: ICategory
): Promise<ICategory> => {
  return CategoryDatabase.create(categoryData);
};

export const getAll = async (): Promise<ICategory[]> => {
  return CategoryDatabase.findAll();
};

export const getById = async (
  id: string
): Promise<ICategory | null> => {
  return CategoryDatabase.findById(id);
};

export const update = async (
  id: string,
  updateData: Partial<ICategory>
): Promise<ICategory | null> => {
  return CategoryDatabase.update(id, updateData);
};

export const remove = async (id: string): Promise<ICategory | null> => {
  return CategoryDatabase.remove(id);
};
