import { Request, Response } from "express";
import { IFile } from "../models/File";
import * as FileService from "../services/FileService";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const fileData = {
      originalName: req.file?.originalname || "",
      mimeType: req.file?.mimetype || "",
      size: req.file?.size || 0,
      ressourceId: req.body.ressourceId,
      path: `/uploads/${req.file?.filename}`,
      uploadedBy: req.body.uploadedBy,
    };

    const file: IFile = await FileService.create(fileData);

    if (!file) {
      res.status(400).json({ message: "File upload failed" });
      return;
    }

    const fileRename = await FileService.renameFileOnDisk({
      currentFilename: file.path,
      newId: file._id.toString(),
      originalName: file.originalName,
    });

    res.status(201).json(fileRename);
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const files: IFile[] = await FileService.getAll();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Error fetching files", error });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const file: IFile | null = await FileService.getById(req.params.id);
    if (!file) {
      res.status(404).json({ message: "File not found" });
      return;
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: "Error fetching file", error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedFile: IFile | null = await FileService.update(
      req.params.id,
      req.body
    );
    if (!updatedFile) {
      res.status(404).json({ message: "File not found" });
      return;
    }
    res.status(200).json(updatedFile);
  } catch (error) {
    res.status(500).json({ message: "Error updating file", error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedFile: IFile | null = await FileService.remove(req.params.id);
    if (!deletedFile) {
      res.status(404).json({ message: "File not found" });
      return;
    }
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting file", error });
  }
};
