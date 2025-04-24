import { Request, Response } from "express";
import path from "path";
import { FileInput } from "../models/File";
import { IRessource } from "../models/Ressource";
import * as CategoryService from "../services/CategoryService";
import * as RessourceService from "../services/RessourceService";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, categoryId, type, quiz } = req.body;

    const category = await CategoryService.getCategoryByIdOrCreateOne(
      categoryId
    );

    const image = (req.files as { [fieldname: string]: Express.Multer.File[] })
      ?.image?.[0];
    const file = (req.files as { [fieldname: string]: Express.Multer.File[] })
      ?.file?.[0];

    const fileInfo: FileInput | undefined = file
      ? {
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          path: path.join("uploads", file.filename),
          ressourceId: "",
          uploadedBy: req.user._id,
        }
      : undefined;

    const imagePath = image ? path.join("uploads", image.filename) : undefined;

    const parsedQuiz = quiz ? JSON.parse(quiz) : undefined;

    const ressource: IRessource = await RessourceService.create({
      title,
      content,
      categoryId: category._id || categoryId,
      createdBy: req.user._id,
      type: type || "Not Started",
      image: imagePath,
      file: fileInfo,
      quiz: parsedQuiz.questions,
    });

    if (!ressource) {
      res.status(400).json({ message: "Error creating resource" });
      return;
    }

    res.status(201).json(ressource);
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(500).json({ message: "Error creating resource", error });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const ressources: IRessource[] = await RessourceService.getAll();

    ressources.forEach((ressource) => {
      ressource.image = ressource.image
        ? path
            .join(process.env.BASE_URL || "", ressource.image)
            .replace(/\\/g, "/")
        : undefined;
    });

    res.status(200).json(ressources);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resources", error });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const ressource: IRessource | null = await RessourceService.getById(
      req.params.id
    );
    if (!ressource) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }

    ressource.image = ressource.image
      ? path
          .join(process.env.BASE_URL || "", ressource.image)
          .replace(/\\/g, "/")
      : undefined;

    res.status(200).json(ressource);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resource", error });
  }
};

export const getTypes = (req: Request, res: Response): void => {
  try {
    const types = RessourceService.getResourceTypes();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resource types", error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedRessource: IRessource | null = await RessourceService.update(
      req.params.id,
      req.body
    );
    if (!updatedRessource) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }
    res.status(200).json(updatedRessource);
  } catch (error) {
    res.status(500).json({ message: "Error updating resource", error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedRessource: IRessource | null = await RessourceService.remove(
      req.params.id
    );
    if (!deletedRessource) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resource", error });
  }
};

export const updateRessource = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const existingRessource = await RessourceService.getById(id);
    if (!existingRessource) {
      res.status(404).json({ message: "Ressource not found" });
      return;
    }

    const updatedData: Partial<IRessource> = {
      title: req.body.title || existingRessource.title,
      content: req.body.content || existingRessource.content,
      categoryId: req.body.categoryId || existingRessource.categoryId,
      quiz: req.body.quiz.questions
        ? req.body.quiz.questions
        : existingRessource.quiz,
    };

    const updatedRessource = await RessourceService.update(id, updatedData);
    if (!updatedRessource) {
      res.status(400).json({ message: "Error updating resource" });
      return;
    }

    res.status(200).json(updatedRessource);
  } catch (error) {
    console.error("Error updating resource:", error);
    res.status(500).json({ message: "Error updating resource", error });
  }
};
