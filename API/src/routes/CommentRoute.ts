import { Router } from "express";
import * as CommentController from "../controllers/comment.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Opérations sur les commentaires
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Récupère tous les commentaires
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Liste des commentaires
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/", CommentController.getAll);

/**
 * @swagger
 * /comments/ressource/{ressourceId}:
 *   get:
 *     summary: Récupère tous les commentaires d'une ressource
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: ressourceId
 *         required: true
 *         description: ID de la ressource
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des commentaires liés à une ressource
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/ressource/:ressourceId", CommentController.getAllByRessourceId);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Récupère un commentaire par son ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du commentaire
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commentaire trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Commentaire non trouvé
 */
router.get("/:id", CommentController.getById);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Crée un nouveau commentaire
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Erreur serveur
 */
router.post("/", CommentController.create);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Met à jour un commentaire existant
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du commentaire
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       200:
 *         description: Commentaire mis à jour
 *       404:
 *         description: Commentaire non trouvé
 */
router.put("/:id", CommentController.update);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Supprime un commentaire
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du commentaire
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commentaire supprimé
 *       404:
 *         description: Commentaire non trouvé
 */
router.delete("/:id", CommentController.remove);

export default router;
