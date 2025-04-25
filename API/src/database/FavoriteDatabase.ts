import Favorite, { IFavorite, IFavoriteInput } from "../models/Favorite";

const create = async (favoriteData: IFavoriteInput): Promise<IFavorite> => {
  return Favorite.create(favoriteData);
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

export const getFavoriteByRessourceId = async (
  ressourceId: string,
  userId: string
): Promise<IFavorite | null> => {
  return await Favorite.findOne({ ressourceId, userId });
};

export const getFavoritesByUserId = async (
  userId: string
): Promise<IFavorite[]> => {
  return await Favorite.find({ userId }).populate("user").populate("ressource");
};

export { create, findAll, findById, remove, update };
