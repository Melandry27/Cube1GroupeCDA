import { Request, Response } from "express";

import bcrypt from "bcrypt";
import { CreateUserInput, IUser } from "../models/User";
import * as UserService from "../services/UserService";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, roleId, adress, phone } = req.body;

    const existingUser = await UserService.getByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "Cet email est déjà utilisé." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: CreateUserInput = await UserService.create({
      name,
      email,
      password: hashedPassword,
      roleId,
      adress,
      phone,
      isVerified: false,
    });

    if (!user) {
      res
        .status(400)
        .json({ message: "Erreur lors de la création de l'utilisateur." });
      return;
    }

    res
      .status(201)
      .json({ user, message: "Utilisateur enregistré avec succès." });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await UserService.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await UserService.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser: IUser | null = await UserService.update(
      req.params.id,
      req.body
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: IUser | null = await UserService.remove(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
