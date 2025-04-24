import * as FavoriteDatabase from "../database/FavoriteDatabase";
import { IFavorite, IFavoriteInput } from "../models/Favorite";

export const createFavorite = async (
  favoriteData: IFavoriteInput
): Promise<IFavorite> => {
  return await FavoriteDatabase.create(favoriteData);
};

export const getAllFavorites = async (): Promise<IFavorite[]> => {
  return await FavoriteDatabase.findAll();
};

export const getFavoriteById = async (
  id: string
): Promise<IFavorite | null> => {
  return await FavoriteDatabase.findById(id);
};

export const updateFavorite = async (
  id: string,
  updateData: Partial<IFavorite>
): Promise<IFavorite | null> => {
  return await FavoriteDatabase.update(id, updateData);
};

export const deleteFavorite = async (id: string): Promise<IFavorite | null> => {
  return await FavoriteDatabase.remove(id);
};

export const getFavoriteByRessourceId = async (
  ressourceId: string,
  userId: string
): Promise<IFavorite | null> => {
  return await FavoriteDatabase.getFavoriteByRessourceId(ressourceId, userId);
};

export const getFavoritesByUserId = async (
  userId: string
): Promise<IFavorite[]> => {
  return await FavoriteDatabase.getFavoritesByUserId(userId);
};
