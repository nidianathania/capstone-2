// src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import laporanRoutes from './routes/laporan.routes.js';
import beritaRoutes from './routes/berita.routes.js';
import notifikasiRoutes from './routes/notifikasi.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/laporans', laporanRoutes);
app.use('/api/berita', beritaRoutes);
app.use('/api/notifikasi', notifikasiRoutes);

export default app;
