import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import * as FileController from "../controllers/file.controller";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));

    req.file = file;
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
