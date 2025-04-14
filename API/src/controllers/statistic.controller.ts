import { Request, Response } from "express";
import { IStatistic } from "../models/Statistic";
import * as StatisticService from "../services/StatisticService";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const stat: IStatistic = await StatisticService.create(req.body);
    res.status(201).json(stat);
  } catch (error) {
    res.status(500).json({ message: "Error creating statistic", error });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats: IStatistic[] = await StatisticService.getAll();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const stat: IStatistic | null = await StatisticService.getById(req.params.id);
    if (!stat) {
      res.status(404).json({ message: "Statistic not found" });
      return;
    }
    res.status(200).json(stat);
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistic", error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedStat: IStatistic | null = await StatisticService.update(
      req.params.id,
      req.body
    );
    if (!updatedStat) {
      res.status(404).json({ message: "Statistic not found" });
      return;
    }
    res.status(200).json(updatedStat);
  } catch (error) {
    res.status(500).json({ message: "Error updating statistic", error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedStat: IStatistic | null = await StatisticService.remove(
      req.params.id
    );
    if (!deletedStat) {
      res.status(404).json({ message: "Statistic not found" });
      return;
    }
    res.status(200).json({ message: "Statistic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting statistic", error });
  }
};
