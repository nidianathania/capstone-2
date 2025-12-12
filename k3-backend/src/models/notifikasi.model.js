// src/models/notifikasi.model.js
import db from "../config/db.js";

export const createNotifikasi = async (userId, pesan) => {
  const q = `
    INSERT INTO notifikasi (user_id, pesan)
    VALUES ($1, $2)
    RETURNING *
  `;
  const r = await db.query(q, [userId, pesan]);
  return r.rows[0];
};

export const getNotifikasiByUser = async (userId) => {
  const q = `
    SELECT *
    FROM notifikasi
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const r = await db.query(q, [userId]);
  return r.rows;
};

export const markNotifikasiRead = async (id) => {
  const q = `
    UPDATE notifikasi
    SET is_read = true
    WHERE id = $1
    RETURNING *
  `;
  const r = await db.query(q, [id]);
  return r.rows[0];
};

export const deleteNotifikasiById = async (id) => {
  const q = `DELETE FROM notifikasi WHERE id = $1`;
  const r = await db.query(q, [id]);
  return r.rowCount; // penting!
};

export const getNotifikasiById = async (id) => {
  const q = `
    SELECT *
    FROM notifikasi
    WHERE id = $1
    LIMIT 1
  `;
  const r = await db.query(q, [id]);
  return r.rows[0];
};
