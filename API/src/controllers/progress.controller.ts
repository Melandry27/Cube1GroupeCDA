import { Request, Response } from "express";
import Progress from "../models/Progress";

// Create a new progress
export const createProgress = async (req: Request, res: Response) => {
  try {
    const { id, userId, ressourceId, status } = req.body;
    const progress = new Progress({ id, userId, ressourceId, status });
    await progress.save();
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error creating progress", error });
  }
};

// Get all progress records
export const getAllProgress = async (req: Request, res: Response) => {
  try {
    const progressList = await Progress.find();
    res.status(200).json(progressList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress records", error });
  }
};

// Get a single progress record by ID
export const getProgressById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const progress = await Progress.findById(id);
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress record", error });
  }
};

// Update a progress record
export const updateProgress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, ressourceId, status } = req.body;
    const progress = await Progress.findByIdAndUpdate(
      id,
      { userId, ressourceId, status },
      { new: true }
    );
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error updating progress record", error });
  }
};

// Delete a progress record
export const deleteProgress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const progress = await Progress.findByIdAndDelete(id);
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.status(200).json({ message: "Progress deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting progress record", error });
  }
};
