// src/models/user.model.js
import db from '../config/db.js';

export const findUserByEmail = async (email) => {
  const q = 'SELECT * FROM users WHERE email = $1';
  const r = await db.query(q, [email]);
  return r.rows[0];
};

export const createUser = async ({ nik, nama_lengkap, perusahaan, posisi, email, password, role, verified }) => {
  const q = `
    INSERT INTO users (nik, nama_lengkap, perusahaan, posisi, email, password, role, verified)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING id, email, nama_lengkap, role, verified
  `;
  
  const vals = [nik, nama_lengkap, perusahaan, posisi, email, password, role, verified];
  
  const r = await db.query(q, vals);
  return r.rows[0];
};

export const findUserById = async (id) => {
  const q = 'SELECT id, nik, nama_lengkap, perusahaan, posisi, email, role, verified, created_at FROM users WHERE id = $1';
  const r = await db.query(q, [id]);
  return r.rows[0];
};

export const verifyUser = async (id) => {
  const q = `UPDATE users SET verified = true WHERE id = $1 RETURNING id, email, verified`;
  const r = await db.query(q, [id]);
  return r.rows[0];
};
