import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Mot de passe incorrect
 *       404:
 *         description: Utilisateur non trouvé
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Enregistrement d'un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - roleId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jean Dupont
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *               roleId:
 *                 type: string
 *                 example: 6600bc5d197b15350a1bde64
 *               adress:
 *                 type: string
 *                 example: 123 rue du Test
 *               phone:
 *                 type: string
 *                 example: 0612345678
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur ou email déjà utilisé
 */
router.post("/register", AuthController.register);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Réinitialisation du mot de passe
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Email de réinitialisation envoyé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.post("/forgot-password", AuthController.forgotPassword);

/**
 * @swagger
 * /auth/verify-email/{token}:
 *   get:
 *     summary: Vérifie l'email de l'utilisateur via un token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de vérification
 *     responses:
 *       200:
 *         description: Email vérifié
 *       400:
 *         description: Lien invalide ou expiré
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get("/verify-email/:token", AuthController.verifyEmail);

export default router;
