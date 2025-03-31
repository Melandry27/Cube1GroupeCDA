import { Request, Response } from "express";
import Comment from "../models/Comment";

// Create a new comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const { id, userId, ressourceId, content } = req.body;
    const newComment = await Comment.create({
      id,
      userId,
      ressourceId,
      content,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
};

// Get all comments
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

// Get a single comment by ID
export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findOne({ id });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comment", error });
  }
};

// Update a comment by ID
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
};

// Delete a comment by ID
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findOneAndDelete({ id });
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};
