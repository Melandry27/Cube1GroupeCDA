import * as ProgressDatabase from "../database/ProgressDatabase";
import { IProgress } from "../models/Progress";

export const createProgress = async (
  progressData: IProgress
): Promise<IProgress> => {
  return await ProgressDatabase.create(progressData);
};

export const getAllProgress = async (): Promise<IProgress[]> => {
  return await ProgressDatabase.findAll();
};

export const getProgressById = async (
  id: string
): Promise<IProgress | null> => {
  return await ProgressDatabase.findById(id);
};

export const updateProgress = async (
  id: string,
  updateData: Partial<IProgress>
): Promise<IProgress | null> => {
  return await ProgressDatabase.update(id, updateData);
};

export const deleteProgress = async (id: string): Promise<IProgress | null> => {
  return await ProgressDatabase.remove(id);
};
