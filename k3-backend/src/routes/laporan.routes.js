// src/routes/laporan.routes.js
import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import role from '../middlewares/role.middleware.js';
import upload from '../services/upload.service.js';
import { create, myReports, allReports, detailReport } from '../controllers/laporan.controller.js';

const router = express.Router();

router.post('/', auth, upload.single('bukti'), create);
router.get('/me', auth, myReports);
router.get('/:id', auth, detailReport);
router.get('/', auth, role('ADMIN'), allReports);

export default router;
