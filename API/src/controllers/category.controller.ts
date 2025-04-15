import { Request, Response } from "express";
import { ICategory } from "../models/Category";
import * as CategoryService from "../services/CategoryService";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const category: ICategory = await CategoryService.create(
      req.body
    );
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories: ICategory[] = await CategoryService.getAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category: ICategory | null = await CategoryService.getById(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCategory: ICategory | null =
      await CategoryService.update(req.params.id, req.body);
    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCategory: ICategory | null =
      await CategoryService.remove(req.params.id);
    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
