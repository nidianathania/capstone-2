// src/routes/berita.routes.js
import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import role from '../middlewares/role.middleware.js';
import upload from '../services/upload.service.js';
import { create, list, detail } from '../controllers/berita.controller.js';

const router = express.Router();

router.get('/', list);
router.get('/:id', detail);
router.post('/', auth, role('ADMIN'), upload.single('gambar'), create);

export default router;
