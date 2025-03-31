import { Request, Response } from "express";
import Role from "../models/Role";

// Create a new role
export const createRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name } = req.body;
    const newRole = new Role({ id, name });
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (error) {
    res.status(500).json({ message: "Error creating role", error });
  }
};

// Get all roles
export const getRoles = async (_req: Request, res: Response): Promise<void> => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles", error });
  }
};

// Get a single role by ID
export const getRoleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const role = await Role.findOne({ id });
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error fetching role", error });
  }
};

// Update a role by ID
export const updateRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedRole = await Role.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    if (!updatedRole) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: "Error updating role", error });
  }
};

// Delete a role by ID
export const deleteRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedRole = await Role.findOneAndDelete({ id });
    if (!deletedRole) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting role", error });
  }
};
