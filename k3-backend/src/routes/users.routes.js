// src/routes/users.routes.js
import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import { getProfile, adminVerifyUser } from '../controllers/user.controller.js';
import role from '../middlewares/role.middleware.js';

const router = express.Router();

router.get('/me', auth, getProfile);
router.put('/:id/verify', auth, role('ADMIN'), adminVerifyUser);

export default router;
