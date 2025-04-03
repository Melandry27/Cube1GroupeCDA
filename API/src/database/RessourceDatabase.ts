import Ressource, { IRessource } from "../models/Ressource";

const create = async (ressourceData: IRessource): Promise<IRessource> => {
  return await Ressource.create(ressourceData);
};

const findAll = async (): Promise<IRessource[]> => {
  return await Ressource.find();
};

const findById = async (id: string): Promise<IRessource | null> => {
  return await Ressource.findOne({ id: Number(id) });
};

const update = async (
  id: string,
  updateData: Partial<IRessource>
): Promise<IRessource | null> => {
  return await Ressource.findOneAndUpdate({ id: Number(id) }, updateData, {
    new: true,
  });
};

const remove = async (id: string): Promise<IRessource | null> => {
  return await Ressource.findOneAndDelete({ id: Number(id) });
};

export { create, findAll, findById, remove, update };
