import { Router } from "express";
import * as FavoriteController from "../controllers/favorite.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Gestion des favoris des utilisateurs
 */

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Récupère tous les favoris
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: Liste des favoris
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 */
router.get("/", FavoriteController.getAll);

/**
 * @swagger
 * /favorites/getByUser:
 *   get:
 *     summary: Récupère les favoris d'un utilisateur
 *     tags: [Favorites]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des favoris de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Requête invalide
 */
router.get("/getByUser", FavoriteController.getByUser);

/**
 * @swagger
 * /favorites/{id}:
 *   get:
 *     summary: Récupère un favori par son ID
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du favori
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Favori trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       404:
 *         description: Favori non trouvé
 */
router.get("/:id", FavoriteController.getById);

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Ajoute un favori
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteInput'
 *     responses:
 *       201:
 *         description: Favori ajouté
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Erreur lors de la création
 */
router.post("/", FavoriteController.create);

/**
 * @swagger
 * /favorites/{id}:
 *   put:
 *     summary: Met à jour un favori
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du favori
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteInput'
 *     responses:
 *       200:
 *         description: Favori mis à jour
 *       400:
 *         description: Erreur de mise à jour
 *       404:
 *         description: Favori non trouvé
 */
router.put("/:id", FavoriteController.update);

/**
 * @swagger
 * /favorites/{id}:
 *   delete:
 *     summary: Supprime un favori
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du favori
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Favori supprimé
 *       404:
 *         description: Favori non trouvé
 */
router.delete("/:id", FavoriteController.remove);

export default router;
