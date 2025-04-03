import { Request, Response } from "express";
import { IComment } from "../models/Comment";
import * as CommentService from "../services/CommentService";

const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment: IComment = await CommentService.createComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
};

const getAllComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments: IComment[] = await CommentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

const getCommentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment: IComment | null = await CommentService.getCommentById(
      Number(req.params.id)
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comment", error });
  }
};

const updateComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedComment: IComment | null = await CommentService.updateComment(
      Number(req.params.id),
      req.body
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
};

const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedComment: IComment | null = await CommentService.deleteComment(
      Number(req.params.id)
    );
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

export {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment,
};
