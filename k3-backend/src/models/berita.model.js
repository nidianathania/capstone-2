// src/models/berita.model.js
import db from '../config/db.js';

export const createBerita = async ({ judul, isi, gambar_url }) => {
  const q = `INSERT INTO berita (judul, isi, gambar_url) VALUES ($1,$2,$3) RETURNING *`;
  const r = await db.query(q, [judul, isi, gambar_url]);
  return r.rows[0];
};

export const getAllBerita = async (limit = 20, offset = 0) => {
  const q = 'SELECT * FROM berita ORDER BY created_at DESC LIMIT $1 OFFSET $2';
  const r = await db.query(q, [limit, offset]);
  return r.rows;
};

export const getBeritaById = async (id) => {
  const q = 'SELECT * FROM berita WHERE id = $1';
  const r = await db.query(q, [id]);
  return r.rows[0];
};
