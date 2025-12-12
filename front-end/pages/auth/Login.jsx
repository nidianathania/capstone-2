import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import K3TeamLogo from '../../assets/images/logo-k3team-dark.png'; 
import './Auth.css'; 

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '', 
        kataSandi: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.email === "admin@k3team.com" && formData.kataSandi === "password123") {
            console.log("Login Berhasil! Mengarahkan ke /home");
            // Menggunakan window.location.href atau useNavigate untuk redirect
            window.location.href = "/home"; 
        } else {
            alert("Login Gagal: Email atau kata sandi salah.");
        }
    };

    return (
        <div className="auth-page-container">
            {/* Bagian Kiri: Informasi Brand */}
            <div className="auth-info-side">
                <img src={K3TeamLogo} alt="K3 Team Logo" className="auth-logo" />
                <h1 className="auth-welcome-title">Selamat Datang Kembali!</h1>
                <p className="auth-slogan">
                    Akses dashboard K3 terpadu Anda. Utamakan keselamatan, jaga keberlanjutan!
                </p>
            </div>

            {/* Bagian Kanan: Formulir Login */}
            <div className="auth-form-side">
                <div className="auth-form-card">
                    <h2 className="form-header">Masuk ke Akun Anda</h2>
                    
                    <form onSubmit={handleSubmit} className="auth-form">
                        
                        {/* Input E-mail */}
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <div className="input-with-icon">
                                <IoMailOutline size={20} className="input-icon" />
                                <input type="email" id="email" name="email" placeholder="Masukkan alamat e-mail" value={formData.email} onChange={handleChange} required/>
                            </div>
                        </div>

                        {/* Input Kata Sandi */}
                        <div className="form-group">
                            <label htmlFor="kataSandi">Kata Sandi</label>
                            <div className="input-with-icon password-toggle">
                                <IoLockClosedOutline size={20} className="input-icon" />
                                <input type={showPassword ? "text" : "password"} id="kataSandi" name="kataSandi" placeholder="Masukkan kata sandi" value={formData.kataSandi} onChange={handleChange} required/>
                                <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-group-helper">
                            <Link to="/forgot-password" className="link-lupa-sandi">Lupa Kata Sandi?</Link>
                        </div>
                        
                        <button type="submit" className="btn-daftar">
                            Masuk
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