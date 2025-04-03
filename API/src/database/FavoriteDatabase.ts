import Favorite, { IFavorite } from "../models/Favorite";

const create = async (favoriteData: IFavorite): Promise<IFavorite> => {
  return await Favorite.create(favoriteData);
};

const findAll = async (): Promise<IFavorite[]> => {
  return await Favorite.find();
};

const findById = async (id: string): Promise<IFavorite | null> => {
  return await Favorite.findById(id);
};

const update = async (
  id: string,
  updateData: Partial<IFavorite>
): Promise<IFavorite | null> => {
  return await Favorite.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const remove = async (id: string): Promise<IFavorite | null> => {
  return await Favorite.findByIdAndDelete(id);
};

export { create, findAll, findById, remove, update };
