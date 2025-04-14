import * as CommentDatabase from "../database/CommentDatabase";
import { IComment } from "../models/Comment";

export const createComment = async (
  commentData: IComment
): Promise<IComment> => {
  return await CommentDatabase.create(commentData);
};

export const getAllComments = async (): Promise<IComment[]> => {
  return await CommentDatabase.getAll();
};

export const getById = async (id: string): Promise<IComment | null> => {
  return await CommentDatabase.getById(id);
};

export const update = async (
  id: string,
  updateData: Partial<IComment>
): Promise<IComment | null> => {
  return await CommentDatabase.update(id, updateData);
};

export const remove = async (id: string): Promise<IComment | null> => {
  return await CommentDatabase.remove(id);
};

export const getAllByRessourceId = async (
  ressourceId: string
): Promise<IComment[]> => {
  return await CommentDatabase.getAllByRessourceId(ressourceId);
};
