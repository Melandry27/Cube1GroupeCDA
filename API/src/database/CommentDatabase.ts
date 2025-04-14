import Comment, { IComment } from "../models/Comment";

export const create = async (commentData: IComment): Promise<IComment> => {
  return Comment.create(commentData);
};

export const getAll = async (): Promise<IComment[]> => {
  return Comment.find();
};

export const getById = async (id: string): Promise<IComment | null> => {
  return Comment.findOne({ _id: id });
};

export const update = async (
  id: string,
  updateData: Partial<IComment>
): Promise<IComment | null> => {
  return Comment.findOneAndUpdate({ _id: id }, updateData, { new: true });
};

export const remove = async (id: string): Promise<IComment | null> => {
  return Comment.findOneAndDelete({ _id: id });
};

export const getAllByRessourceId = async (
  ressourceId: string
): Promise<IComment[]> => {
  return Comment.find({ ressourceId });
};
