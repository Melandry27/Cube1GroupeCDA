import * as CommentDatabase from "../database/CommentDatabase";
import { IComment } from "../models/Comment";

const createComment = async (commentData: IComment): Promise<IComment> => {
  return await CommentDatabase.create(commentData);
};

const getAllComments = async (): Promise<IComment[]> => {
  return await CommentDatabase.findAll();
};

const getCommentById = async (id: number): Promise<IComment | null> => {
  return await CommentDatabase.findById(id);
};

const updateComment = async (
  id: number,
  updateData: Partial<IComment>
): Promise<IComment | null> => {
  return await CommentDatabase.update(id, updateData);
};

const deleteComment = async (id: number): Promise<IComment | null> => {
  return await CommentDatabase.remove(id);
};

export {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment,
};
