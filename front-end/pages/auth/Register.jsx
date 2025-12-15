// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIdCardOutline, IoPersonOutline, IoBusinessOutline, IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import K3TeamLogo from '../../assets/images/logo-k3team-dark.png';
import './Auth.css';
import { registerAPI } from '../../services/auth.service';

const SuccessModal = ({ onClose }) => (
  <div className="auth-modal-overlay">
    <div className="auth-modal-content">
      <h2 className="modal-title">Pendaftaran Akun Berhasil</h2>
      <p className="modal-message">
        Tim kami sedang memverifikasi akun Anda. Anda akan mendapatkan notifikasi setelah proses selesai.
      </p>
      <button className="modal-button" onClick={onClose}>OK</button>
    </div>
  </div>
);

function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // NOTE: use keys that match backend fields
  const [formData, setFormData] = useState({
    nik: '',
    nama_lengkap: '',
    perusahaan: '',
    posisi: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const payload = { ...formData }; // keys already match backend names
      const res = await registerAPI(payload);
      if (res && res.success) {
        setIsSuccessModalOpen(true);
        // optional: auto-redirect to login after a short delay
        setTimeout(() => {
          setIsSuccessModalOpen(false);
          navigate('/login');
        }, 1200);
      } else {
        setMsg({ type: 'error', text: res?.message || 'Gagal mendaftar' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || err.message || 'Terjadi kesalahan' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-info-side">
        <img src={K3TeamLogo} alt="K3 Team Logo" className="auth-logo" />
        <h1 className="auth-welcome-title">Selamat Datang di K3 TEAM</h1>
        <p className="auth-slogan">
          Bersama kami, setiap langkah dilakukan dengan standar terbaik untuk menciptakan tempat kerja yang aman.
        </p>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-card">
          <h2 className="form-header">Daftar Akun</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            {msg && <div className={`auth-msg ${msg.type === 'error' ? 'error' : 'success'}`}>{msg.text}</div>}

            <div className="form-group">
              <label htmlFor="nik">Nomor Induk Kependudukan</label>
              <div className="input-with-icon">
                <IoIdCardOutline size={20} className="input-icon" />
                <input type="text" id="nik" name="nik" placeholder="Masukkan NIK" value={formData.nik} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="nama_lengkap">Nama Lengkap</label>
              <div className="input-with-icon">
                <IoPersonOutline size={20} className="input-icon" />
                <input type="text" id="nama_lengkap" name="nama_lengkap" placeholder="Masukkan nama lengkap sesuai KTP" value={formData.nama_lengkap} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="perusahaan">Perusahaan</label>
              <div className="input-with-icon">
                <IoBusinessOutline size={20} className="input-icon" />
                <input type="text" id="perusahaan" name="perusahaan" placeholder="Masukkan nama perusahaan anda" value={formData.perusahaan} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="posisi">Posisi</label>
              <div className="input-with-icon select-wrapper">
                <select id="posisi" name="posisi" value={formData.posisi} onChange={handleChange} required>
                  <option value="" disabled>Pilih posisi anda</option>
                  <option value="Staf K3">Staf K3</option>
                  <option value="Manajer">Manajer</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <div className="input-with-icon">
                <IoMailOutline size={20} className="input-icon" />
                <input type="email" id="email" name="email" placeholder="Masukkan alamat e-mail" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Kata Sandi</label>
              <div className="input-with-icon password-toggle">
                <IoLockClosedOutline size={20} className="input-icon" />
                <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Masukkan kata sandi" value={formData.password} onChange={handleChange} required />
                <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-daftar" disabled={loading}>
              {loading ? 'Mendaftarkan...' : 'Daftar'}
            </button>
          </form>

          <div className="auth-footer">
            Sudah memiliki akun? <Link to="/login" className="link-masuk">Masuk</Link>
          </div>
        </div>
      </div>

      {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} />}
    </div>
  );
}

export default RegisterPage;
