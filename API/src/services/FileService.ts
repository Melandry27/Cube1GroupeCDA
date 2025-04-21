import fs from "fs/promises";
import { Types } from "mongoose";
import path from "path";
import * as FileDatabase from "../database/FileDatabase";
import { IFile } from "../models/File";

interface RenameFileParams {
  currentFilename: string;
  newId: string;
  originalName: string;
}

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
  id: string | Types.ObjectId,
  updateData: Partial<IFile>
): Promise<IFile | null> => {
  return FileDatabase.update(id, updateData);
};

export const remove = async (id: string): Promise<IFile | null> => {
  return FileDatabase.remove(id);
};

const uploadsDir = path.join(__dirname, "..", "..");

export const renameFileOnDisk = async ({
  currentFilename,
  newId,
  originalName,
}: RenameFileParams): Promise<IFile | null> => {
  const ext = path.extname(originalName);
  const newFilename = `\\uploads\\${newId}${ext}`;

  const oldPath = path.join(uploadsDir, currentFilename);
  const newPath = path.join(uploadsDir, newFilename);

  await fs.rename(oldPath, newPath);

  const newFilePathForDB = newFilename.replace(/\\/g, "/");

  const updatedFile = await FileDatabase.update(newId, {
    path: `${newFilePathForDB}`,
  });

  return updatedFile;
};
