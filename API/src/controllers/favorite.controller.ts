import { Request, Response } from "express";
import { IFavorite } from "../models/Favorite";
import * as FavoriteService from "../services/FavoriteService";

const createFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const favorite: IFavorite = await FavoriteService.createFavorite(req.body);
    res.status(201).json(favorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const favorites: IFavorite[] = await FavoriteService.getAllFavorites();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFavoriteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const favorite: IFavorite | null = await FavoriteService.getFavoriteById(
      req.params.id
    );
    if (!favorite) {
      res.status(404).json({ message: "Favorite not found" });
    }
    res.status(200).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedFavorite: IFavorite | null =
      await FavoriteService.updateFavorite(req.params.id, req.body);
    if (!updatedFavorite) {
      res.status(404).json({ message: "Favorite not found" });
    }
    res.status(200).json(updatedFavorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedFavorite: IFavorite | null =
      await FavoriteService.deleteFavorite(req.params.id);
    if (!deletedFavorite) {
      res.status(404).json({ message: "Favorite not found" });
    }
    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createFavorite,
  deleteFavorite,
  getAllFavorites,
  getFavoriteById,
  updateFavorite,
};
