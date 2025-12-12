// src/controllers/berita.controller.js
import { success, error } from '../utils/response.js';
import { createBerita, getAllBerita, getBeritaById } from '../models/berita.model.js';

export const create = async (req, res) => {
  try {
    const { judul, isi } = req.body;
    const gambar_url = req.file ? req.file.path : null;
    const data = await createBerita({ judul, isi, gambar_url });
    return success(res, 'Berita dibuat', data);
  } catch (err) {
    console.error(err);
    return error(res, 'Server error', 500);
  }
};

export const list = async (req, res) => {
  try {
    const data = await getAllBerita();
    return success(res, 'Daftar berita', data);
  } catch (err) {
    console.error(err);
    return error(res, 'Server error', 500);
  }
};

export const detail = async (req, res) => {
  try {
    const data = await getBeritaById(req.params.id);
    if (!data) return error(res, 'Berita tidak ditemukan', 404);
    return success(res, 'Detail berita', data);
  } catch (err) {
    console.error(err);
    return error(res, 'Server error', 500);
  }
};
