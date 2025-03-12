// import multer from "multer";
// // Configure multer storage
// const storage = multer.memoryStorage(); // Store files in memory (you can also configure disk storage)

// const upload = multer({ storage: storage });

// // Middleware for handling file uploads
// const uploadMiddleware = upload.single("url"); // Adjust to accept a single file upload

// export default uploadMiddleware;


import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file from multer", file);
    const uploadPath = path.join(__dirname, "uploads");
    // Ensure the uploads directory exists
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

 const upload = multer({
  storage,
});

export default upload;