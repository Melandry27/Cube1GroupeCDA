import * as CategoryDatabase from "../database/CategoryDatabase";
import { ICategory } from "../models/Category";

export const createCategory = async (
  categoryData: ICategory
): Promise<ICategory> => {
  return await CategoryDatabase.create(categoryData);
};

export const getCategories = async (): Promise<ICategory[]> => {
  return await CategoryDatabase.findAll();
};

export const getCategoryById = async (
  id: number
): Promise<ICategory | null> => {
  return await CategoryDatabase.findById(id);
};

export const updateCategory = async (
  id: number,
  updateData: Partial<ICategory>
): Promise<ICategory | null> => {
  return await CategoryDatabase.update(id, updateData);
};

export const deleteCategory = async (id: number): Promise<ICategory | null> => {
  return await CategoryDatabase.remove(id);
};
