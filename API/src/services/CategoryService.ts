import * as CategoryDatabase from "../database/CategoryDatabase";
import { ICategory } from "../models/Category";

const createCategory = async (categoryData: ICategory): Promise<ICategory> => {
  return await CategoryDatabase.create(categoryData);
};

const getCategories = async (): Promise<ICategory[]> => {
  return await CategoryDatabase.findAll();
};

const getCategoryById = async (id: number): Promise<ICategory | null> => {
  return await CategoryDatabase.findById(id);
};

const updateCategory = async (
  id: number,
  updateData: Partial<ICategory>
): Promise<ICategory | null> => {
  return await CategoryDatabase.update(id, updateData);
};

const deleteCategory = async (id: number): Promise<ICategory | null> => {
  return await CategoryDatabase.remove(id);
};

export {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
};
