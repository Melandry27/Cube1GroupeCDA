import Progress, { IProgress } from "../models/Progress";

const create = async (progressData: IProgress): Promise<IProgress> => {
  return await Progress.create(progressData);
};

const findAll = async (): Promise<IProgress[]> => {
  return await Progress.find();
};

const findById = async (id: string): Promise<IProgress | null> => {
  return await Progress.findById(id);
};

const update = async (
  id: string,
  updateData: Partial<IProgress>
): Promise<IProgress | null> => {
  return await Progress.findByIdAndUpdate(id, updateData, { new: true });
};

const remove = async (id: string): Promise<IProgress | null> => {
  return await Progress.findByIdAndDelete(id);
};

export { create, findAll, findById, remove, update };
