import express from "express";
import { getCommentsByRessourceId } from "../controllers/RessourceController"; // Import the controller

const router = express.Router();

// ...existing code...

// Route to get comments by ressourceId
router.get("/:ressourceId/comments", getCommentsByRessourceId);

// ...existing code...

export default router;
