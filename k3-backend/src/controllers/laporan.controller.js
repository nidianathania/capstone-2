// src/controllers/laporan.controller.js
import { success, error } from '../utils/response.js';
import { createLaporan, getLaporanByUser, getAllLaporan, getLaporanById } from '../models/laporan.model.js';

export const create = async (req, res) => {
  try {
    // form-data : fields + file uploaded by upload middleware => req.file
    const userId = req.user.id;
    const { jenis_laporan, lokasi_kejadian, detail_laporan, kontak } = req.body;
    const bukti_url = req.file ? req.file.path : null; // multer-storage-cloudinary sets file.path to cloud url
    const data = await createLaporan({ user_id: userId, jenis_laporan, lokasi_kejadian, detail_laporan, bukti_url, kontak });
    return success(res, 'Laporan berhasil dibuat', data);
  } catch (err) {
    console.error(err);
    return error(res, 'Server error', 500);
  }
};

export const myReports = async (req, res) => {
  try {
    const data = await getLaporanByUser(req.user.id);
    return success(res, 'Daftar laporan user', data);
  } catch (err) {
    console.error(err);
    return error(res, 'Server error', 500);
  }
};

export const allReports = async (req, res) => {
  try {
    const data = await getAllLaporan();
    return success(res, 'Daftar semua laporan', data);
  } catch (err) {
    console.error(err);
    return error(res, 'Server error', 500);
  }
};

export const detailReport = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getLaporanById(id);
    if (!data) return error(res, 'Laporan tidak ditemukan', 404);
    return success(res, 'Detail laporan', data);
  } catch (err) {
    console.error(err);
    return error(res, 'Server error', 500);
  }
};
