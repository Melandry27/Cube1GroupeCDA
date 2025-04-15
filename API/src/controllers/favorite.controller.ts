import { Request, Response } from "express";
import { IFavorite } from "../models/Favorite";
import * as FavoriteService from "../services/FavoriteService";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const favorite: IFavorite = await FavoriteService.createFavorite(req.body);
    res.status(201).json(favorite);
  } catch (error) {
    res.status(400).json({ message: "Error creating favorite", error });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const favorites: IFavorite[] = await FavoriteService.getAllFavorites();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites", error });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const favorite: IFavorite | null = await FavoriteService.getFavoriteById(
      req.params.id
    );
    if (!favorite) {
      res.status(404).json({ message: "Favorite not found" });
      return;
    }
    res.status(200).json(favorite);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorite", error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedFavorite: IFavorite | null =
      await FavoriteService.updateFavorite(req.params.id, req.body);
    if (!updatedFavorite) {
      res.status(404).json({ message: "Favorite not found" });
      return;
    }
    res.status(200).json(updatedFavorite);
  } catch (error) {
    res.status(400).json({ message: "Error updating favorite", error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedFavorite: IFavorite | null =
      await FavoriteService.deleteFavorite(req.params.id);
    if (!deletedFavorite) {
      res.status(404).json({ message: "Favorite not found" });
      return;
    }
    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting favorite", error });
  }
};
