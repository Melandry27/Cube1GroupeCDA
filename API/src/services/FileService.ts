import * as FileDatabase from "../database/FileDatabase";
import { IFile } from "../models/File";

export const create = async (fileData: Partial<IFile>): Promise<IFile> => {
  return FileDatabase.create(fileData);
};

export const getAll = async (): Promise<IFile[]> => {
  return FileDatabase.findAll();
};

export const getById = async (id: string): Promise<IFile | null> => {
  return FileDatabase.findById(id);
};

export const update = async (
  id: string,
  updateData: Partial<IFile>
): Promise<IFile | null> => {
  return FileDatabase.update(id, updateData);
};

export const remove = async (id: string): Promise<IFile | null> => {
  return FileDatabase.remove(id);
};
