import { Types } from "mongoose";
import File, { IFile } from "../models/File";

export const create = async (fileData: Partial<IFile>): Promise<IFile> => {
  const file = new File(fileData);
  return await file.save();
};

export const findAll = async (): Promise<IFile[]> => {
  return await File.find();
};

export const findById = async (id: string): Promise<IFile | null> => {
  return await File.findOne({ _id: id });
};

export const update = async (
  id: string | Types.ObjectId,
  updateData: Partial<IFile>
): Promise<IFile | null> => {
  return await File.findOneAndUpdate({ _id: id }, updateData, { new: true });
};

export const remove = async (id: string): Promise<IFile | null> => {
  return await File.findOneAndDelete({ _id: id });
};
