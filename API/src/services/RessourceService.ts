import * as RessourceDatabase from "../database/RessourceDatabase";
import { IRessource } from "../models/Ressource";

const createRessource = async (
  ressourceData: IRessource
): Promise<IRessource> => {
  return await RessourceDatabase.create(ressourceData);
};

const getAllRessources = async (): Promise<IRessource[]> => {
  return await RessourceDatabase.findAll();
};

const getRessourceById = async (id: string): Promise<IRessource | null> => {
  return await RessourceDatabase.findById(id);
};

const updateRessource = async (
  id: string,
  updateData: Partial<IRessource>
): Promise<IRessource | null> => {
  return await RessourceDatabase.update(id, updateData);
};

const deleteRessource = async (id: string): Promise<IRessource | null> => {
  return await RessourceDatabase.remove(id);
};

export {
  createRessource,
  deleteRessource,
  getAllRessources,
  getRessourceById,
  updateRessource,
};
