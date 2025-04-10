import * as RessourceDatabase from "../database/RessourceDatabase";
import { IRessource } from "../models/Ressource";

export const createRessource = async (
  ressourceData: IRessource
): Promise<IRessource> => {
  return await RessourceDatabase.create(ressourceData);
};

export const getAllRessources = async (): Promise<IRessource[]> => {
  return await RessourceDatabase.findAll();
};

export const getRessourceById = async (
  id: string
): Promise<IRessource | null> => {
  return await RessourceDatabase.findById(id);
};

export const updateRessource = async (
  id: string,
  updateData: Partial<IRessource>
): Promise<IRessource | null> => {
  return await RessourceDatabase.update(id, updateData);
};

export const deleteRessource = async (
  id: string
): Promise<IRessource | null> => {
  return await RessourceDatabase.remove(id);
};
