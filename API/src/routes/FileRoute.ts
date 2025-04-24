import express from "express";
import * as FileController from "../controllers/file.controller";
import { uploadFile } from "../middlewares/uploadFile";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: Gestion des fichiers liés aux ressources
 */

/**
 * @swagger
 * /files/upload:
 *   post:
 *     summary: Upload d’un fichier
 *     tags: [Files]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - ressourceId
 *               - uploadedBy
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               ressourceId:
 *                 type: string
 *                 example: "6601b235e7b3c35a67f7aabc"
 *               uploadedBy:
 *                 type: string
 *                 example: "6601b1f5e7b3c35a67f7aabb"
 *     responses:
 *       201:
 *         description: Fichier uploadé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/File"
 *       400:
 *         description: Échec de l’upload
 */
router.post("/upload", uploadFile.single("file"), FileController.create);

/**
 * @swagger
 * /files:
 *   get:
 *     summary: Récupère tous les fichiers
 *     tags: [Files]
 *     responses:
 *       200:
 *         description: Liste des fichiers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/File"
 */
router.get("/", FileController.getAll);

/**
 * @swagger
 * /files/{id}:
 *   get:
 *     summary: Récupère un fichier par son ID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du fichier
 *     responses:
 *       200:
 *         description: Fichier trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/File"
 *       404:
 *         description: Fichier non trouvé
 */
router.get("/:id", FileController.getById);

/**
 * @swagger
 * /files/{id}:
 *   put:
 *     summary: Met à jour un fichier (infos en base uniquement)
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du fichier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/FileInput"
 *     responses:
 *       200:
 *         description: Fichier mis à jour
 *       404:
 *         description: Fichier non trouvé
 */
router.put("/:id", FileController.update);

/**
 * @swagger
 * /files/{id}:
 *   delete:
 *     summary: Supprime un fichier
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du fichier
 *     responses:
 *       200:
 *         description: Fichier supprimé
 *       404:
 *         description: Fichier non trouvé
 */
router.delete("/:id", FileController.remove);

export default router;
