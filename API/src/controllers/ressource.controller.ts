import { Request, Response } from "express";
import { IRessource } from "../models/Ressource";
import * as RessourceService from "../services/RessourceService";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const ressource: IRessource = await RessourceService.create(
      req.body
    );
    res.status(201).json(ressource);
  } catch (error) {
    res.status(500).json({ message: "Error creating resource", error });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const ressources: IRessource[] = await RessourceService.getAll();
    res.status(200).json(ressources);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resources", error });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const ressource: IRessource | null = await RessourceService.getById(req.params.id);
    if (!ressource) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }
    res.status(200).json(ressource);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resource", error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedRessource: IRessource | null =
      await RessourceService.update(req.params.id, req.body);
    if (!updatedRessource) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }
    res.status(200).json(updatedRessource);
  } catch (error) {
    res.status(500).json({ message: "Error updating resource", error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedRessource: IRessource | null =
      await RessourceService.remove (req.params.id);
    if (!deletedRessource) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resource", error });
  }
};
