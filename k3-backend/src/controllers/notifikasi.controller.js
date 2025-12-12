// src/controllers/notifikasi.controller.js
import { success, error } from "../utils/response.js";
import {
  createNotifikasi,
  getNotifikasiByUser,
  markNotifikasiRead,
  deleteNotifikasiById,
  getNotifikasiById,
} from "../models/notifikasi.model.js";
import { findUserById } from "../models/user.model.js";

// SEND NOTIFIKASI
export const sendNotifikasi = async (req, res) => {
  try {
    const { user_id, pesan } = req.body;

    // validasi user exist
    const user = await findUserById(user_id);
    if (!user) return error(res, "User tidak ditemukan", 404);

    const data = await createNotifikasi(user_id, pesan);
    return success(res, "Notifikasi terkirim", data);
  } catch (err) {
    console.error(err);
    return error(res, "Server error", 500);
  }
};

// GET NOTIFIKASI SAYA
export const getMyNotifikasi = async (req, res) => {
  try {
    const data = await getNotifikasiByUser(req.user.id);
    return success(res, "Daftar notifikasi", data);
  } catch (err) {
    console.error(err);
    return error(res, "Server error", 500);
  }
};

// MARK AS READ
export const markRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notif = await getNotifikasiById(id);
    if (!notif) return error(res, "Notifikasi tidak ditemukan", 404);

    // Cek kepemilikan notifikasi
    if (notif.user_id !== req.user.id) {
      return error(res, "Tidak boleh menandai notifikasi orang lain", 403);
    }

    const data = await markNotifikasiRead(id);
    return success(res, "Notifikasi ditandai sudah dibaca", data);
  } catch (err) {
    console.error(err);
    return error(res, "Server error", 500);
  }
};

// DELETE NOTIFIKASI
export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const notif = await getNotifikasiById(id);
    if (!notif) return error(res, "Notifikasi tidak ditemukan", 404);

    // Cek kepemilikan notifikasi
    if (notif.user_id !== req.user.id) {
      return error(res, "Tidak boleh menghapus notifikasi orang lain", 403);
    }

    await deleteNotifikasiById(id);
    return success(res, "Notifikasi dihapus");
  } catch (err) {
    console.error(err);
    return error(res, "Server error", 500);
  }
};
