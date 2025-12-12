// src/services/upload.service.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// storage via multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'laporan_k3',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 1200, crop: 'limit' }]
  }
});

const upload = multer({ storage });

export default upload;
