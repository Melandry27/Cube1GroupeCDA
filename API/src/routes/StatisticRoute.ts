import { Router } from "express";
import * as StatisticController from "../controllers/statistic.controller";

const router = Router();

router.get("/", StatisticController.getAll);
router.get("/:id", StatisticController.getById);
router.post("/", StatisticController.create);
router.put("/:id", StatisticController.update);
router.delete("/:id", StatisticController.remove);

export default router;
