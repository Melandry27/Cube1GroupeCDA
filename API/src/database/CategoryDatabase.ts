import Category, { ICategory } from "../models/Category";

export const create = async (categoryData: ICategory): Promise<ICategory> => {
  const category = new Category(categoryData);
  return await category.save();
};

export const findAll = async (): Promise<ICategory[]> => {
  return await Category.find();
};

export const findById = async (id: string): Promise<ICategory | null> => {
  return await Category.findOne({ _id: id });
};

export const update = async (
  id: string,
  updateData: Partial<ICategory>
): Promise<ICategory | null> => {
  return await Category.findOneAndUpdate({ _id: id }, updateData, { new: true });
};

export const remove = async (id: string): Promise<ICategory | null> => {
  return await Category.findOneAndDelete({ _id: id });
};