// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
});

// attach token from localStorage automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('k3_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

export default API;
