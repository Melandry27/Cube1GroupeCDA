import { Router } from "express";
import * as ProgressController from "../controllers/progress.controller";

const router = Router();

router.get("/", ProgressController.getAll);
router.get("/:id", ProgressController.getById);
router.post("/", ProgressController.create);
router.put("/:id", ProgressController.update);
router.delete("/:id", ProgressController.remove);

export default router;
