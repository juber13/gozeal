
import Certificate from "../model/certificate.js";
import { uploadImage } from "./middleware/uploader.js";

const createCertificate = async (req, res) => {
    const { certificateName, issuer } = req.body;
    const {path} = req.file;
   

    const imagePath = await uploadImage(path);
    try {
      const certificate = await Certificate.create({
        certificateName,
        issuer,
        url: imagePath.secure_url,
      });
      return res.status(201).json(certificate);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};


const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { createCertificate, getAllCertificates };
