import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// Tentukan path folder
const dir = path.join(__dirname, "../public/uploads/thumbnails");

// Buat folder jika belum ada
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Konfigurasi penyimpanan multer
const storage: StorageEngine = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, dir);
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
