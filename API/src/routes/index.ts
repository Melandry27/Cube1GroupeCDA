import express, { Router } from "express";
import { protect } from "../middlewares/protect";
import authRoutes from "./AuthRoute";
import categoryRoutes from "./CategoryRoute";
import commentRoutes from "./CommentRoute";
import favoriteRoutes from "./FavoriteRoute";
import fileRoutes from "./FileRoute";
import progressRoutes from "./ProgressRoute";
import ressourceRoutes from "./RessourceRoute";
import roleRoutes from "./RoleRoute";
import statisticRoutes from "./StatisticRoute";
import userRoutes from "./UserRoute";

const router = Router();

router.use(protect as express.RequestHandler);

console.log("Routes are being set up....");

router.use("/auth", authRoutes);

router.use("/files", fileRoutes);
router.use("/categories", categoryRoutes);
router.use("/comments", commentRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/progress", progressRoutes);
router.use("/ressources", ressourceRoutes);
router.use("/roles", roleRoutes);
router.use("/statistics", statisticRoutes);
router.use("/users", userRoutes);

export default router;
