import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roleId, adress, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      roleId,
      adress,
      phone,
      validateEmail: false,
      validatePassword: true,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "Utilisateur enregistré avec succès." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de l'enregistrement.", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      message: "Connexion réussie.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        adress: user.adress,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la connexion.", error });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const resetToken = generateToken(user.id);

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
      html: `<p>Bonjour ${user.name},</p>
             <p>Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
             <a href="http://localhost:3000/reset-password/${resetToken}">Réinitialiser mon mot de passe</a>
             <p>Ce lien est valide pendant une heure.</p>`,
    });

    return res.status(200).json({
      message:
        "Un email contenant les instructions pour réinitialiser votre mot de passe a été envoyé.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la réinitialisation.", error });
  }
};
