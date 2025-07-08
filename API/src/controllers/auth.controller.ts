import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User, { CreateUserInput } from "../models/User";
import * as AuthService from "../services/AuthService";
import * as RoleServices from "../services/RoleService";
import * as UserService from "../services/UserService";
import { generateToken } from "../utils";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, adress, phone } = req.body;

    const emailToLowerCase = email.toLowerCase();

    const role = await RoleServices.getRoleBySlug("citoyen-connecte");

    if (!role) {
      res.status(400).json({ message: "Rôle introuvable." });
      return;
    }

    const existingUser = await UserService.getByEmail(emailToLowerCase);
    if (existingUser) {
      res.status(400).json({ message: "Cet email est déjà utilisé." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: CreateUserInput = await UserService.create({
      name,
      email: emailToLowerCase,
      password: hashedPassword,
      roleId: role._id as string,
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

    const tokenVerification = AuthService.createVerificationToken(
      email,
      JWT_SECRET
    );

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
      subject: "Vérification de votre compte",
      html: `<p>Bonjour ${name},</p>
            <p>Merci pour votre inscription ! Veuillez cliquer sur le bouton ci-dessous pour vérifier votre compte :</p>
            <a href="http://localhost:5000/api/auth/verify-email/${tokenVerification}" style="padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Vérifier mon compte</a>
            <p>Ce lien est valide pendant 1 heure.</p>`,
    });

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
    console.log("Login ERROR:", error);
    res.status(500).json({ message: "Erreur lors de la connexion.", error });
    return;
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email requis." });
      return;
    }

    const user = await UserService.getByEmail(email.toLowerCase());

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }

    const newPassword = AuthService.generateNewPassword();

    await UserService.update(user.id, {
      password: await bcrypt.hash(newPassword, 10),
    });

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
             <p>Voici votre nouveau mot de passe: "${newPassword}"</p>`,
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

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    console.log("Token: ", token);

    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };

    const user = await User.findOne({ email: decoded.email.toLowerCase() });

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ message: "Le compte est déjà vérifié." });
      return;
    }

    // Update user verification status
    await UserService.update(user.id, {
      isVerified: true,
    });

    res.send(`
      <html>
        <head>
          <title>Vérification</title>
          <script>
            alert("Votre compte a bien été vérifié.");
            window.close();
          </script>
        </head>
        <body>
          <p>Vous pouvez fermer cette page.</p>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(400).json({ message: "Lien invalide ou expiré.", error });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      res.status(400).json({ message: "Tous les champs sont requis." });
      return;
    }

    if (newPassword !== confirmPassword) {
      res
        .status(400)
        .json({ message: "Les mots de passe ne correspondent pas." });
      return;
    }

    const userId = req.user._id;

    const user = await UserService.getById(userId);

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé." });
      return;
    }

    const isOldPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isOldPasswordValid) {
      res.status(400).json({ message: "Ancien mot de passe incorrect." });
      return;
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await UserService.update(user.id, { password: hashedNewPassword });

    res.status(200).json({ message: "Mot de passe changé avec succès." });
  } catch (error) {
    console.error("Change Password ERROR: ", error);
    res
      .status(500)
      .json({ message: "Erreur lors du changement de mot de passe.", error });
  }
};
