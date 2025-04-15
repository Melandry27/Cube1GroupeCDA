import { Request, Response } from "express";
import { IComment } from "../models/Comment";
import * as CommentService from "../services/CommentService";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment: IComment = await CommentService.createComment(
      req.body
    );
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments: IComment[] = await CommentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment: IComment | null = await CommentService.getById(
      req.params.id
    );
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comment", error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedComment: IComment | null = await CommentService.update(
      req.params.id,
      req.body
    );
    if (!updatedComment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedComment: IComment | null = await CommentService.remove(
      req.params.id
    );
    if (!deletedComment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

export const getAllByRessourceId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const comments: IComment[] =
      await CommentService.getAllByRessourceId(req.params.ressourceId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};
