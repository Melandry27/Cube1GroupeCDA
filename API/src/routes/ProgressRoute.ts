import { Router } from "express";
import * as ProgressController from "../controllers/progress.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Progress
 *   description: Suivi de la progression des utilisateurs
 */

/**
 * @swagger
 * /progress:
 *   get:
 *     summary: Récupère toutes les entrées de progression
 *     tags: [Progress]
 *     responses:
 *       200:
 *         description: Liste des enregistrements de progression
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Progress"
 */
router.get("/", ProgressController.getAll);

/**
 * @swagger
 * /progress/{id}:
 *   get:
 *     summary: Récupère une entrée de progression par ID
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la progression
 *     responses:
 *       200:
 *         description: Donnée de progression trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Progress"
 *       404:
 *         description: Progression non trouvée
 */
router.get("/:id", ProgressController.getById);

/**
 * @swagger
 * /progress:
 *   post:
 *     summary: Crée une nouvelle progression
 *     tags: [Progress]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProgressInput"
 *     responses:
 *       201:
 *         description: Progression créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Progress"
 *       500:
 *         description: Erreur lors de la création
 */
router.post("/", ProgressController.create);

/**
 * @swagger
 * /progress/{id}:
 *   put:
 *     summary: Met à jour une progression
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la progression
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ProgressInput"
 *     responses:
 *       200:
 *         description: Progression mise à jour
 *       404:
 *         description: Progression non trouvée
 */
router.put("/:id", ProgressController.update);

/**
 * @swagger
 * /progress/{id}:
 *   delete:
 *     summary: Supprime une progression
 *     tags: [Progress]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la progression
 *     responses:
 *       200:
 *         description: Progression supprimée
 *       404:
 *         description: Progression non trouvée
 */
router.delete("/:id", ProgressController.remove);

export default router;
