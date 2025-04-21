import { Router } from "express";
import * as RoleController from "../controllers/role.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestion des rôles des utilisateurs
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Récupère tous les rôles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Liste des rôles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
router.get("/", RoleController.getAll);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Récupère un rôle par ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du rôle
 *     responses:
 *       200:
 *         description: Rôle trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Rôle non trouvé
 */
router.get("/:id", RoleController.getById);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crée un nouveau rôle
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       201:
 *         description: Rôle créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       500:
 *         description: Erreur lors de la création
 */
router.post("/", RoleController.create);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Met à jour un rôle existant
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du rôle à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       200:
 *         description: Rôle mis à jour avec succès
 *       404:
 *         description: Rôle non trouvé
 */
router.put("/:id", RoleController.update);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Supprime un rôle
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du rôle
 *     responses:
 *       200:
 *         description: Rôle supprimé avec succès
 *       404:
 *         description: Rôle non trouvé
 */
router.delete("/:id", RoleController.remove);

export default router;
