// src/services/auth.service.js
import API from './api';

// register expects: { nik, nama_lengkap, perusahaan, posisi, email, password }
export const registerAPI = (payload) => API.post('/api/auth/register', payload).then(r => r.data);

// login expects: { email, password }
// backend returns { success, message, data: { token, user } } OR { success, message, data: {user, token} }
// adapt to both shapes
export const loginAPI = async (payload) => {
  const r = await API.post('/api/auth/login', payload);
  return r.data;
};
