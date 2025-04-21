import { Router } from "express";
import * as StatisticController from "../controllers/statistic.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: Gestion des statistiques des utilisateurs
 */

/**
 * @swagger
 * /statistics:
 *   get:
 *     summary: Récupère toutes les statistiques
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Liste des statistiques
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statistic'
 */
router.get("/", StatisticController.getAll);

/**
 * @swagger
 * /statistics/{id}:
 *   get:
 *     summary: Récupère une statistique par ID
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la statistique
 *     responses:
 *       200:
 *         description: Statistique trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistic'
 *       404:
 *         description: Statistique non trouvée
 */
router.get("/:id", StatisticController.getById);

/**
 * @swagger
 * /statistics:
 *   post:
 *     summary: Crée une nouvelle statistique
 *     tags: [Statistics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatisticInput'
 *     responses:
 *       201:
 *         description: Statistique créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistic'
 *       500:
 *         description: Erreur lors de la création
 */
router.post("/", StatisticController.create);

/**
 * @swagger
 * /statistics/{id}:
 *   put:
 *     summary: Met à jour une statistique existante
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la statistique à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatisticInput'
 *     responses:
 *       200:
 *         description: Statistique mise à jour avec succès
 *       404:
 *         description: Statistique non trouvée
 */
router.put("/:id", StatisticController.update);

/**
 * @swagger
 * /statistics/{id}:
 *   delete:
 *     summary: Supprime une statistique
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la statistique
 *     responses:
 *       200:
 *         description: Statistique supprimée avec succès
 *       404:
 *         description: Statistique non trouvée
 */
router.delete("/:id", StatisticController.remove);

export default router;
