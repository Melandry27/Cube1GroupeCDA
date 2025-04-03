import { Request, Response } from "express";
import { ICategory } from "../models/Category";
import * as CategoryService from "../services/CategoryService";

const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category: ICategory = await CategoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories: ICategory[] = await CategoryService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category: ICategory | null = await CategoryService.getCategoryById(
      Number(req.params.id)
    );
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCategory: ICategory | null =
      await CategoryService.updateCategory(Number(req.params.id), req.body);
    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCategory: ICategory | null =
      await CategoryService.deleteCategory(Number(req.params.id));
    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

export {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
};
