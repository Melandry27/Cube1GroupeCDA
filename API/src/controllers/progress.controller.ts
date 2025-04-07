import { Request, Response } from "express";
import { IProgress } from "../models/Progress";
import * as ProgressService from "../services/ProgressService";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const progress: IProgress = await ProgressService.createProgress(req.body);
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error creating progress", error });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const progressList: IProgress[] = await ProgressService.getAllProgress();
    res.status(200).json(progressList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress records", error });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const progress: IProgress | null = await ProgressService.getProgressById(
      req.params.id
    );
    if (!progress) {
      res.status(404).json({ message: "Progress not found" });
    }
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress record", error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProgress: IProgress | null =
      await ProgressService.updateProgress(req.params.id, req.body);
    if (!updatedProgress) {
      res.status(404).json({ message: "Progress not found" });
    }
    res.status(200).json(updatedProgress);
  } catch (error) {
    res.status(500).json({ message: "Error updating progress record", error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProgress: IProgress | null =
      await ProgressService.deleteProgress(req.params.id);
    if (!deletedProgress) {
      res.status(404).json({ message: "Progress not found" });
    }
    res.status(200).json({ message: "Progress deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting progress record", error });
  }
};
