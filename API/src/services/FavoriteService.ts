import * as FavoriteDatabase from "../database/FavoriteDatabase";
import { IFavorite } from "../models/Favorite";

const createFavorite = async (favoriteData: IFavorite): Promise<IFavorite> => {
  return await FavoriteDatabase.create(favoriteData);
};

const getAllFavorites = async (): Promise<IFavorite[]> => {
  return await FavoriteDatabase.findAll();
};

const getFavoriteById = async (id: string): Promise<IFavorite | null> => {
  return await FavoriteDatabase.findById(id);
};

const updateFavorite = async (
  id: string,
  updateData: Partial<IFavorite>
): Promise<IFavorite | null> => {
  return await FavoriteDatabase.update(id, updateData);
};

const deleteFavorite = async (id: string): Promise<IFavorite | null> => {
  return await FavoriteDatabase.remove(id);
};

export {
  createFavorite,
  deleteFavorite,
  getAllFavorites,
  getFavoriteById,
  updateFavorite,
};
