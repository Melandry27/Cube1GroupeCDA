import fs from "fs";
import multer from "multer";
import path from "path";

const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const uploadFiles = multer({ storage });

export const uploadRessourceFields = uploadFiles.fields([
  { name: "image", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);
