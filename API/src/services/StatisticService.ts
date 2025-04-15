import * as StatisticDB from "../database/StatisticDatabase";
import { IStatistic } from "../models/Statistic";

export const getAll = async (): Promise<IStatistic[]> => {
  return StatisticDB.getAllStatistics();
};

export const getById = async (id: string): Promise<IStatistic | null> => {
  return StatisticDB.getStatisticById(id);
};

export const create = async (data: IStatistic): Promise<IStatistic> => {
  return StatisticDB.createStatistic(data);
};

export const update = async (
  id: string,
  updateData: Partial<IStatistic>
): Promise<IStatistic | null> => {
  return StatisticDB.updateStatistic(id, updateData);
};

export const remove = async (id: string): Promise<IStatistic | null> => {
  return StatisticDB.deleteStatistic(id);
};
