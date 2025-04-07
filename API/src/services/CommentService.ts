import * as CommentDatabase from "../database/CommentDatabase";
import { IComment } from "../models/Comment";

export const createComment = async (
  commentData: IComment
): Promise<IComment> => {
  return await CommentDatabase.create(commentData);
};

export const getAllComments = async (): Promise<IComment[]> => {
  return await CommentDatabase.findAll();
};

export const getCommentById = async (id: number): Promise<IComment | null> => {
  return await CommentDatabase.findById(id);
};

export const updateComment = async (
  id: number,
  updateData: Partial<IComment>
): Promise<IComment | null> => {
  return await CommentDatabase.update(id, updateData);
};

export const deleteComment = async (id: number): Promise<IComment | null> => {
  return await CommentDatabase.remove(id);
};
