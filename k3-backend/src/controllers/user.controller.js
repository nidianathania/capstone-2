// src/controllers/user.controller.js
import { success, error } from '../utils/response.js';
import { findUserById, verifyUser } from '../models/user.model.js';

export const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    return success(res, 'Profil user', user);
  } catch (err) {
    console.error(err);
    return error(res, 'Server error', 500);
  }
};

export const adminVerifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await verifyUser(id);
    return success(res, 'User diverifikasi', updated);
  } catch (err) {
    console.error(err);
    return error(res, 'Server error', 500);
  }
};
