// src/routes/AppRoutes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom'; 

// Import semua halaman
import Splash from '../pages/Splash/Splash.jsx';
import LandingPage from '../pages/LandingPage.jsx'; 
import LoginPage from '../pages/auth/Login.jsx';
import RegisterPage from '../pages/auth/Register.jsx';
import Home from '../pages/Home/Home.jsx'; 

// Placeholder
const PengaduanPage = () => <div>Halaman Pengaduan (Belum dibuat)</div>; 

function AppRoutes() {
  return (
    <Routes>
      {/* 1. RUTE AWAL MUTLAK: Splash Screen */}
      <Route path="/" element={<Splash />} /> 
      
      {/* 2. RUTE PUBLIK: Landing Page setelah Splash */}
      <Route path="/landing" element={<LandingPage />} /> 
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* 3. RUTE PRIVATE (SETELAH LOGIN) */}
      <Route path="/home" element={<Home />} /> 
      <Route path="/pengaduan" element={<PengaduanPage />} /> 

      {/* Rute Default/404 */}
      <Route path="*" element={<h1>404 - Halaman Tidak Ditemukan</h1>} />
    </Routes>
  );
}

export default AppRoutes;