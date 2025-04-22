import { Request, Response } from "express";
import slugify from "slugify";
import { IRole } from "../models/Role";
import * as RoleService from "../services/RoleService";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    const nameSlugify: string = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const existingRole: IRole | null = await RoleService.getRoleBySlug(
      nameSlugify
    );

    if (existingRole) {
      res.status(400).json({ message: "Role already exists" });
      return;
    }

    const role: IRole = await RoleService.createNewRole({
      name,
      slug: nameSlugify,
    });

    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error creating role", error });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles: IRole[] = await RoleService.getRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles", error });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const role: IRole | null = await RoleService.getRole(req.params.id);
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error fetching role", error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedRole: IRole | null = await RoleService.updateExistingRole(
      req.params.id,
      req.body
    );
    if (!updatedRole) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: "Error updating role", error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedRole: IRole | null = await RoleService.deleteRoleById(
      req.params.id
    );
    if (!deletedRole) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting role", error });
  }
};
