import { Router } from "express";
import * as CommentController from "../controllers/comment.controller";

const router = Router();

router.get("/", CommentController.getAll);
router.get(
  "/ressource/:ressourceId",
  CommentController.getAllCommentsByRessourceId
);
router.get("/:id", CommentController.getById);
router.post("/", CommentController.create);
router.put("/:id", CommentController.update);
router.delete("/:id", CommentController.remove);

export default router;
