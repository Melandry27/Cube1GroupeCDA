import * as RessourceDatabase from "../database/RessourceDatabase";
import { IRessource } from "../models/Ressource";

export const getAll = async (): Promise<IRessource[]> => {
  return RessourceDatabase.getAllRessources();
};

export const getById = async (id: string): Promise<IRessource | null> => {
  return RessourceDatabase.getRessourceById(id);
};

export const create = async (ressourceData: IRessource): Promise<IRessource> => {
  return RessourceDatabase.createRessource(ressourceData);
};

export const update = async (
  id: string,
  updateData: Partial<IRessource>
): Promise<IRessource | null> => {
  return RessourceDatabase.updateRessource(id, updateData);
};

export const remove = async (id: string): Promise<IRessource | null> => {
  return RessourceDatabase.removeRessource(id);
};
