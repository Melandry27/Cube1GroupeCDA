import Comment, { IComment } from "../models/Comment";

const create = async (commentData: IComment): Promise<IComment> => {
  return await Comment.create(commentData);
};

const findAll = async (): Promise<IComment[]> => {
  return await Comment.find();
};

const findById = async (id: number): Promise<IComment | null> => {
  return await Comment.findOne({ id });
};

const update = async (
  id: number,
  updateData: Partial<IComment>
): Promise<IComment | null> => {
  return await Comment.findOneAndUpdate({ id }, updateData, { new: true });
};

const remove = async (id: number): Promise<IComment | null> => {
  return await Comment.findOneAndDelete({ id });
};

const findAllByRessourceId = async (
  ressourceId: string
): Promise<IComment[]> => {
  return await Comment.find({ ressourceId });
};

export { create, findAll, findAllByRessourceId, findById, remove, update };
