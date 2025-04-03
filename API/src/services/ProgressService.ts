import * as ProgressDatabase from "../database/ProgressDatabase";
import { IProgress } from "../models/Progress";

const createProgress = async (progressData: IProgress): Promise<IProgress> => {
  return await ProgressDatabase.create(progressData);
};

const getAllProgress = async (): Promise<IProgress[]> => {
  return await ProgressDatabase.findAll();
};

const getProgressById = async (id: string): Promise<IProgress | null> => {
  return await ProgressDatabase.findById(id);
};

const updateProgress = async (
  id: string,
  updateData: Partial<IProgress>
): Promise<IProgress | null> => {
  return await ProgressDatabase.update(id, updateData);
};

const deleteProgress = async (id: string): Promise<IProgress | null> => {
  return await ProgressDatabase.remove(id);
};

export {
  createProgress,
  deleteProgress,
  getAllProgress,
  getProgressById,
  updateProgress,
};
