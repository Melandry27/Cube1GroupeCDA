import * as CategoryDatabase from "../database/CategoryDatabase";
import { CategoryInput, ICategory } from "../models/Category";

export const create = async (
  categoryData: CategoryInput
): Promise<ICategory> => {
  return CategoryDatabase.create(categoryData);
};

export const getAll = async (): Promise<ICategory[]> => {
  return CategoryDatabase.findAll();
};

export const getById = async (id: string): Promise<ICategory | null> => {
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

export const getCategoryByIdOrCreateOne = async (
  categoryId: string
): Promise<ICategory> => {
  const category = await CategoryDatabase.findById(categoryId);

  if (category) {
    return category;
  } else {
    let defaultCategoryData = await CategoryDatabase.getBySlug("default");
    if (!defaultCategoryData) {
      const defaultCategory = {
        name: "Default",
        slug: "default",
        description: "Default category",
        color: "#777",
      };

      defaultCategoryData = await CategoryDatabase.create(defaultCategory);
    }

    return defaultCategoryData;
  }
};
