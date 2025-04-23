import Category, { CategoryInput, ICategory } from "../models/Category";

export const create = async (
  categoryData: CategoryInput
): Promise<ICategory> => {
  const category = new Category(categoryData);
  return await category.save();
};

export const findAll = async (): Promise<ICategory[]> => {
  return await Category.find();
};

export const findById = async (id: string): Promise<ICategory | null> => {
  try {
    const category = await Category.findById(id);

    return category;
  } catch (error) {
    return null;
  }
};

export const update = async (
  id: string,
  updateData: Partial<ICategory>
): Promise<ICategory | null> => {
  return await Category.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
};

export const remove = async (id: string): Promise<ICategory | null> => {
  return await Category.findOneAndDelete({ _id: id });
};

export const getBySlug = async (slug: string): Promise<ICategory | null> => {
  try {
    const category = await Category.findOne({ slug });
    return category;
  } catch (error) {
    return null;
  }
};
