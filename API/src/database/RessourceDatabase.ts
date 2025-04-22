import Ressource, { IRessource } from "../models/Ressource";

export const getAllRessources = async (): Promise<IRessource[]> => {
  return Ressource.find().populate("createdBy");
};

export const getRessourceById = async (
  id: string
): Promise<IRessource | null> => {
  return Ressource.findOne({ _id: id }).populate("createdBy");
};

export const createRessource = async (
  ressourceData: IRessource
): Promise<IRessource> => {
  return Ressource.create(ressourceData);
};

export const updateRessource = async (
  id: string,
  updateData: Partial<IRessource>
): Promise<IRessource | null> => {
  return Ressource.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
};

export const removeRessource = async (
  id: string
): Promise<IRessource | null> => {
  return Ressource.findOneAndDelete({ _id: id });
};
