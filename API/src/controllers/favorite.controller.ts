import { Request, Response } from "express";
import Favorite from "../models/Favorite";

// Create a new favorite
export const createFavorite = async (req: Request, res: Response) => {
  try {
    const favorite = new Favorite(req.body);
    const savedFavorite = await favorite.save();
    res.status(201).json(savedFavorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all favorites
export const getFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await Favorite.find();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single favorite by ID
export const getFavoriteById = async (req: Request, res: Response) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    res.status(200).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a favorite by ID
export const updateFavorite = async (req: Request, res: Response) => {
  try {
    const updatedFavorite = await Favorite.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFavorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    res.status(200).json(updatedFavorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a favorite by ID
export const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const deletedFavorite = await Favorite.findByIdAndDelete(req.params.id);
    if (!deletedFavorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
