// src/controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { success, error } from "../utils/response.js";
import { findUserByEmail, createUser } from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { nik, nama_lengkap, perusahaan, posisi, email, password } = req.body;

    if (!nama_lengkap || !email || !password) {
      return error(res, "Nama lengkap, email, dan password wajib diisi", 400);
    }

    const existing = await findUserByEmail(email);
    if (existing) return error(res, "Email sudah terdaftar", 400);

    const hashed = await bcrypt.hash(password, 10);

    const user = await createUser({
      nik,
      nama_lengkap,
      perusahaan,
      posisi,
      email,
      password: hashed,
      role: "user",        // default role
      verified: false      // default belum diverifikasi admin
    });

    return success(res, "Register berhasil, menunggu verifikasi admin", user);
  } catch (err) {
    console.error(err);
    return error(res, "Server error", 500);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return error(res, "Email tidak ditemukan", 404);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return error(res, "Password salah", 401);

    if (!user.verified) return error(res, "Akun belum diverifikasi admin", 403);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return success(res, "Login berhasil", {
      token,
      user: {
        id: user.id,
        email: user.email,
        nama_lengkap: user.nama_lengkap,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return error(res, "Server error", 500);
  }
};
