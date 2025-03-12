import  express from "express";
const router = express.Router();

import {createCertificate , getAllCertificates} from "../controllers/certificate.js";
import uploadMiddleware from "../controllers/middleware/multer.js";


router.post("/certificate", uploadMiddleware.single('url'), createCertificate);
router.get("/certificates", getAllCertificates);
export default router;