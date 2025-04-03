import { Request, Response } from "express";
import Statistic from "../models/Statistic";

// Create a new statistic
export const createStatistic = async (req: Request, res: Response) => {
  try {
    const statistic = new Statistic(req.body);
    const savedStatistic = await statistic.save();
    res.status(201).json(savedStatistic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all statistics
export const getAllStatistics = async (req: Request, res: Response) => {
  try {
    const statistics = await Statistic.find();
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single statistic by ID
export const getStatisticById = async (req: Request, res: Response) => {
  try {
    const statistic = await Statistic.findById(req.params.id);
    if (!statistic) {
      return res.status(404).json({ message: "Statistic not found" });
    }
    res.status(200).json(statistic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a statistic by ID
export const updateStatistic = async (req: Request, res: Response) => {
  try {
    const updatedStatistic = await Statistic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStatistic) {
      return res.status(404).json({ message: "Statistic not found" });
    }
    res.status(200).json(updatedStatistic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a statistic by ID
export const deleteStatistic = async (req: Request, res: Response) => {
  try {
    const deletedStatistic = await Statistic.findByIdAndDelete(req.params.id);
    if (!deletedStatistic) {
      return res.status(404).json({ message: "Statistic not found" });
    }
    res.status(200).json({ message: "Statistic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
