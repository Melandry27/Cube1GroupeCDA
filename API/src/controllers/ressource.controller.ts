import { Request, Response } from "express";
import Ressource from "../models/Ressource";

// Create a new resource
export const createRessource = async (req: Request, res: Response) => {
  try {
    const { id, title, content, type, createdBy } = req.body;
    const newRessource = new Ressource({ id, title, content, type, createdBy });
    const savedRessource = await newRessource.save();
    res.status(201).json(savedRessource);
  } catch (error) {
    res.status(500).json({ message: "Error creating resource", error });
  }
};

// Get all resources
export const getAllRessources = async (req: Request, res: Response) => {
  try {
    const ressources = await Ressource.find();
    res.status(200).json(ressources);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resources", error });
  }
};

// Get a single resource by ID
export const getRessourceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ressource = await Ressource.findOne({ id: Number(id) });
    if (!ressource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(ressource);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resource", error });
  }
};

// Update a resource by ID
export const updateRessource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedRessource = await Ressource.findOneAndUpdate(
      { id: Number(id) },
      req.body,
      { new: true }
    );
    if (!updatedRessource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json(updatedRessource);
  } catch (error) {
    res.status(500).json({ message: "Error updating resource", error });
  }
};

// Delete a resource by ID
export const deleteRessource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedRessource = await Ressource.findOneAndDelete({
      id: Number(id),
    });
    if (!deletedRessource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resource", error });
  }
};
