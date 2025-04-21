import { Router } from "express";
import * as RessourceController from "../controllers/ressource.controller";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Ressources
 *   description: Gestion des ressources (articles, vidéos, documents...)
 */

/**
 * @swagger
 * /ressources:
 *   get:
 *     summary: Récupère toutes les ressources
 *     tags: [Ressources]
 *     responses:
 *       200:
 *         description: Liste des ressources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ressource'
 */
router.get("/", RessourceController.getAll);

router.get("/types", RessourceController.getTypes);

/**
 * @swagger
 * /ressources/{id}:
 *   get:
 *     summary: Récupère une ressource par ID
 *     tags: [Ressources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ressource
 *     responses:
 *       200:
 *         description: Ressource trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ressource'
 *       404:
 *         description: Ressource non trouvée
 */
router.get("/:id", RessourceController.getById);

/**
 * @swagger
 * /ressources:
 *   post:
 *     summary: Crée une nouvelle ressource
 *     tags: [Ressources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RessourceInput'
 *     responses:
 *       201:
 *         description: Ressource créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ressource'
 *       500:
 *         description: Erreur lors de la création
 */
router.post("/", RessourceController.create);

/**
 * @swagger
 * /ressources/{id}:
 *   put:
 *     summary: Met à jour une ressource existante
 *     tags: [Ressources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ressource à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RessourceInput'
 *     responses:
 *       200:
 *         description: Ressource mise à jour avec succès
 *       404:
 *         description: Ressource non trouvée
 */
router.put("/:id", RessourceController.update);

/**
 * @swagger
 * /ressources/{id}:
 *   delete:
 *     summary: Supprime une ressource
 *     tags: [Ressources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ressource
 *     responses:
 *       200:
 *         description: Ressource supprimée avec succès
 *       404:
 *         description: Ressource non trouvée
 */
router.delete("/:id", RessourceController.remove);

export default router;
