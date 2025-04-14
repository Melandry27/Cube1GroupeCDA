import StatisticModel, { IStatistic } from "../models/Statistic";

export const getAllStatistics = async (): Promise<IStatistic[]> => {
  return StatisticModel.find();
};

export const getStatisticById = async (
  id: string
): Promise<IStatistic | null> => {
  return StatisticModel.findOne({ id });
};

export const createStatistic = async (
  data: IStatistic
): Promise<IStatistic> => {
  const stat = new StatisticModel(data);
  return stat.save();
};

export const updateStatistic = async (
  id: string,
  updateData: Partial<IStatistic>
): Promise<IStatistic | null> => {
  return StatisticModel.findOneAndUpdate({ id }, updateData, { new: true });
};

export const deleteStatistic = async (
  id: string
): Promise<IStatistic | null> => {
  return StatisticModel.findOneAndDelete({ id });
};
