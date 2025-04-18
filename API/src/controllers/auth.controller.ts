import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import User, { CreateUserInput } from "../models/User";
import * as RoleServices from "../services/RoleService";
import * as UserService from "../services/UserService";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

const generateToken = (user: any, role: any) => {
  return jwt.sign(
    {
      name: user.name,
      email: user.email,
      role: role.name,
      adress: user.adress,
      phone: user.phone,
    },
    JWT_SECRET
  );
};

export const register = async (req: Request, res: Response) => {
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
    });

    if (!user) {
      res
        .status(400)
        .json({ message: "Erreur lors de la création de l'utilisateur." });
      return;
    }

    res.status(201).json({ message: "Utilisateur enregistré avec succès." });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.getByEmail(email);
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Mot de passe incorrect." });
      return;
    }
    const role = await RoleServices.getRole(user.roleId);

    const token = generateToken(user, role);

    res.status(200).json({
      message: "Connexion réussie.",
      token,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion.", error });
    return;
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }

    const role = await RoleServices.getRole(user.roleId);

    const resetToken = generateToken(user?.id, role);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Réinitialisation du mot de passe",
      html: `<p>Bonjour ${user?.name},</p>
             <p>Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
             <a href="http://localhost:3000/reset-password/${resetToken}">Réinitialiser mon mot de passe</a>
             <p>Ce lien est valide pendant une heure.</p>`,
    });

    res.status(200).json({
      message:
        "Un email contenant les instructions pour réinitialiser votre mot de passe a été envoyé.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la réinitialisation.", error });
  }
};
