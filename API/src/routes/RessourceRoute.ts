import { Router } from "express";
import * as RessourceController from "../controllers/ressource.controller";

const router = Router();

router.get("/", RessourceController.getAll);
router.get("/:id", RessourceController.getById);
router.post("/", RessourceController.create);
router.put("/:id", RessourceController.update);
router.delete("/:id", RessourceController.remove);

export default router;
