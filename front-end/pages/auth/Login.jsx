// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import K3TeamLogo from '../../assets/images/logo-k3team-dark.png';
import './Auth.css';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // fungsi login dari context

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      // useAuth.login akan meng-handle pemanggilan API dan penyimpanan token/user
      const res = await login({ email: formData.email, password: formData.password });
      if (res.success) {
        setMsg({ type: 'success', text: res.message || 'Login berhasil' });
        // redirect ke halaman protected (home)
        navigate('/home');
      } else {
        setMsg({ type: 'error', text: res.message || 'Login gagal' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: err?.message || 'Terjadi kesalahan' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-info-side">
        <img src={K3TeamLogo} alt="K3 Team Logo" className="auth-logo" />
        <h1 className="auth-welcome-title">Selamat Datang Kembali!</h1>
        <p className="auth-slogan">
          Akses dashboard K3 terpadu Anda. Utamakan keselamatan, jaga keberlanjutan!
        </p>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-card">
          <h2 className="form-header">Masuk ke Akun Anda</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            {msg && (
              <div className={`auth-msg ${msg.type === 'error' ? 'error' : 'success'}`}>
                {msg.text}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <div className="input-with-icon">
                <IoMailOutline size={20} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Masukkan alamat e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Kata Sandi</label>
              <div className="input-with-icon password-toggle">
                <IoLockClosedOutline size={20} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Masukkan kata sandi"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="toggle password"
                >
                  {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </button>
              </div>
            </div>

            <div className="form-group-helper">
              <Link to="/forgot-password" className="link-lupa-sandi">Lupa Kata Sandi?</Link>
            </div>

            <button type="submit" className="btn-daftar" disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="auth-footer">
            Belum punya akun? <Link to="/register" className="link-masuk">Daftar Akun Baru</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
