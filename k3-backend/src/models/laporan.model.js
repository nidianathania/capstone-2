// src/models/laporan.model.js
import db from '../config/db.js';

export const createLaporan = async ({ user_id, jenis_laporan, lokasi_kejadian, detail_laporan, bukti_url, kontak }) => {
  const q = `INSERT INTO laporans (user_id, jenis_laporan, lokasi_kejadian, detail_laporan, bukti_url, kontak)
             VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
  const vals = [user_id, jenis_laporan, lokasi_kejadian, detail_laporan, bukti_url, kontak];
  const r = await db.query(q, vals);
  return r.rows[0];
};

export const getLaporanByUser = async (userId) => {
  const q = 'SELECT * FROM laporans WHERE user_id = $1 ORDER BY created_at DESC';
  const r = await db.query(q, [userId]);
  return r.rows;
};

export const getLaporanById = async (id) => {
  const q = 'SELECT * FROM laporans WHERE id = $1';
  const r = await db.query(q, [id]);
  return r.rows[0];
};

export const getAllLaporan = async (filters = {}, limit = 20, offset = 0) => {
  // simple implementation: no filters complex
  const q = 'SELECT * FROM laporans ORDER BY created_at DESC LIMIT $1 OFFSET $2';
  const r = await db.query(q, [limit, offset]);
  return r.rows;
};

export const updateLaporanStatus = async (id, data) => {
  const q = `UPDATE laporans SET detail_laporan = COALESCE($2, detail_laporan),
             jenis_laporan = COALESCE($3, jenis_laporan),
             lokasi_kejadian = COALESCE($4, lokasi_kejadian),
             bukti_url = COALESCE($5, bukti_url),
             kontak = COALESCE($6, kontak),
             updated_at = now()
             WHERE id = $1 RETURNING *`;
  const r = await db.query(q, [id, data.detail_laporan, data.jenis_laporan, data.lokasi_kejadian, data.bukti_url, data.kontak]);
  return r.rows[0];
};
