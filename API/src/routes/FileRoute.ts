import express from "express";
import multer from "multer";
import path from "path";
import * as FileController from "../controllers/file.controller";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/upload", upload.single("file"), FileController.create);

router.get("/", FileController.getAll);
router.get("/:id", FileController.getById);
router.put("/:id", FileController.update);
router.delete("/:id", FileController.remove);

export default router;
