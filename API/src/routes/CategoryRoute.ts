import { Router } from "express";
import * as CategoryController from "../controllers/category.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Opérations sur les catégories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Récupère toutes les catégories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Liste des catégories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", CategoryController.getAll);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Récupère une catégorie par son ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la catégorie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la catégorie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Catégorie non trouvée
 */
router.get("/:id", CategoryController.getById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crée une nouvelle catégorie
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Erreur serveur
 */
router.post("/", CategoryController.create);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Met à jour une catégorie existante
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la catégorie
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       200:
 *         description: Catégorie mise à jour
 *       404:
 *         description: Catégorie non trouvée
 */
router.put("/:id", CategoryController.update);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Supprime une catégorie
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la catégorie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catégorie supprimée
 *       404:
 *         description: Catégorie non trouvée
 */
router.delete("/:id", CategoryController.remove);

export default router;
