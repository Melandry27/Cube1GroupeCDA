import Category, { ICategory } from "../models/Category";

const create = async (categoryData: ICategory): Promise<ICategory> => {
  const category = new Category(categoryData);
  return await category.save();
};

const findAll = async (): Promise<ICategory[]> => {
  return await Category.find();
};

const findById = async (id: number): Promise<ICategory | null> => {
  return await Category.findOne({ id });
};

const update = async (
  id: number,
  updateData: Partial<ICategory>
): Promise<ICategory | null> => {
  return await Category.findOneAndUpdate({ id }, updateData, { new: true });
};

const remove = async (id: number): Promise<ICategory | null> => {
  return await Category.findOneAndDelete({ id });
};

export { create, findAll, findById, remove, update };
