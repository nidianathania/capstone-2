// src/routes/notifikasi.routes.js
import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import role from '../middlewares/role.middleware.js';
import { sendNotifikasi, getMyNotifikasi, markRead, remove } from '../controllers/notifikasi.controller.js';

const router = express.Router();

router.post('/', auth, role('ADMIN'), sendNotifikasi);
router.get('/', auth, getMyNotifikasi);
router.put('/:id/read', auth, markRead);
router.delete('/:id', auth, remove);

export default router;
