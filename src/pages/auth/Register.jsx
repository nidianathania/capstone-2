import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIdCardOutline, IoPersonOutline, IoBusinessOutline, IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import K3TeamLogo from '../../assets/images/logo-k3team-dark.png';
import './Auth.css';

// Sukses Registrasi
const SuccessModal = ({ onClose }) => (
    <div className="auth-modal-overlay">
        <div className="auth-modal-content">
            <h2 className="modal-title">Pendaftaran Akun Berhasil</h2>
            <p className="modal-message">
                Tim kami sedang memverifikasi akun Anda. Anda akan mendapatkan notifikasi setelah proses selesai.
            </p>
            <button className="modal-button" onClick={onClose}>
                OK
            </button>
        </div>
    </div>
);

function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nik: '', namaLengkap: '', perusahaan: '', posisi: '', email: '', kataSandi: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulasi pendaftaran berhasil
        setIsSuccessModalOpen(true);
    };

    return (
        <div className="auth-page-container">
            {/* Bagian Kiri: Informasi Brand */}
            <div className="auth-info-side">
                <img src={K3TeamLogo} alt="K3 Team Logo" className="auth-logo" />
                <h1 className="auth-welcome-title">Selamat Datang di K3 TEAM</h1>
                <p className="auth-slogan">
                    Bersama kami, setiap langkah dilakukan dengan standar terbaik untuk menciptakan tempat kerja yang aman, produktif, dan berkelanjutan.
                </p>
            </div>

            {/* Bagian Kanan: Formulir Pendaftaran */}
            <div className="auth-form-side">
                <div className="auth-form-card">
                    <h2 className="form-header">Daftar Akun</h2>
                    <form onSubmit={handleSubmit} className="auth-form">
                        
                        {/* Input Fields */}
                        <div className="form-group">
                            <label htmlFor="nik">Nomor Induk Kependudukan</label>
                            <div className="input-with-icon">
                                <IoIdCardOutline size={20} className="input-icon" />
                                <input type="text" id="nik" name="nik" placeholder="Masukkan Nomor Induk Kependudukan anda" value={formData.nik} onChange={handleChange} required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="namaLengkap">Nama Lengkap</label>
                            <div className="input-with-icon">
                                <IoPersonOutline size={20} className="input-icon" />
                                <input type="text" id="namaLengkap" name="namaLengkap" placeholder="Masukkan nama lengkap sesuai KTP" value={formData.namaLengkap} onChange={handleChange} required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="perusahaan">Perusahaan</label>
                            <div className="input-with-icon">
                                <IoBusinessOutline size={20} className="input-icon" />
                                <input type="text" id="perusahaan" name="perusahaan" placeholder="Masukkan nama perusahaan anda" value={formData.perusahaan} onChange={handleChange} required/>
                            </div>
                        </div>

                        {/* Select Dropdown */}
                        <div className="form-group">
                            <label htmlFor="posisi">Posisi</label>
                            <div className="input-with-icon select-wrapper">
                                <select id="posisi" name="posisi" value={formData.posisi} onChange={handleChange} required>
                                    <option value="" disabled>Pilih posisi anda dalam perusahaan</option>
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
                                <input type="email" id="email" name="email" placeholder="Masukkan alamat e-mail yang sudah terdaftar" value={formData.email} onChange={handleChange} required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="kataSandi">Kata Sandi</label>
                            <div className="input-with-icon password-toggle">
                                <IoLockClosedOutline size={20} className="input-icon" />
                                <input type={showPassword ? "text" : "password"} id="kataSandi" name="kataSandi" placeholder="Masukkan kata sandi akun anda" value={formData.kataSandi} onChange={handleChange} required/>
                                <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn-daftar">
                            Daftar
                        </button>
                    </form>
                    
                    <div className="auth-footer">
                        Sudah memiliki akun? <Link to="/login" className="link-masuk">Masuk</Link>
                    </div>
                </div>
            </div>

            {/* Modal Sukses */}
            {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)} />}
        </div>
    );
}

export default RegisterPage;