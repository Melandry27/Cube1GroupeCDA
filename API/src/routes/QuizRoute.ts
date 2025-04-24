import express from "express";
import {
  create,
  getById,
  getByResourceId,
  update,
  remove,
  addQuestion,
  submitAnswers,
} from "../controllers/quiz.controller";

const router = express.Router();

router.post("/", create);
router.get("/:id", getById);
router.get("/resource/:resourceId", getByResourceId);
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/:id/questions", addQuestion);
router.post("/:id/submit", submitAnswers);

export default router;