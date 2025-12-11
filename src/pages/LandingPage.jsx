import React from 'react';
import { Link } from 'react-router-dom';
import { 
    IoWarningOutline, IoInformationCircleOutline, IoStatsChartOutline,
    IoArrowForwardOutline, IoLogoWhatsapp, IoLogoInstagram, IoMailOutline
} from 'react-icons/io5';

import Carousel from "../components/Carousel";

// --- LOGO & GAMBAR ---
import K3TeamLogoDark from '../assets/images/logo-k3team-dark.png';
import K3WorkerImage from '../assets/images/logo-k3-worker-small.png';
import K3TeamLogoWhite from '../assets/images/logo secondary k3team.png';

// --- GAMBAR ARTIKEL BERITA ---
import Artikel1 from "../assets/images/artikel1.png";
import Artikel2 from "../assets/images/artikel2.png";
import Artikel3 from "../assets/images/artikel3.png";

import './LandingPage.css';

// ================= NAVBAR =================
const Navbar = () => (
    <nav className="landing-navbar">
        <img src={K3TeamLogoDark} alt="K3 TEAM Logo" className="nav-logo-small" />
        <ul className="nav-links">
            <li><a href="#beranda">Beranda</a></li>
            <li><a href="#pengaduan">Pengaduan</a></li>
            <li><a href="#informasi">Informasi</a></li>
            <li><a href="#data-statistik">Data Statistik</a></li>
            <li><a href="#berita">Berita</a></li>
        </ul>
        <div className="nav-auth">
            <Link to="/register" className="btn-nav-daftar">Daftar</Link>
            <Link to="/login" className="btn-nav-masuk">Masuk</Link>
        </div>
    </nav>
);

// ================= SERVICE CARD =================
const ServiceCard = ({ icon: Icon, title, description, linkText }) => (
    <div className="service-card">
        <Icon size={36} className="card-icon" />
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to="/pengaduan" className="card-link">
            {linkText} <IoArrowForwardOutline />
        </Link>
    </div>
);

// ================= BERITA CARD =================
const BeritaCard = ({ tag, title, date, link, image }) => (
    <div className="berita-card">
        <span className={`berita-tag tag-${tag.toLowerCase()}`}>{tag}</span>

        {/* Gambar Berita */}
        <img 
            src={image} 
            alt={title}
            className="berita-image"
            style={{
                width: "100%",
                height: "192px",
                borderRadius: "12px",
                objectFit: "cover"
            }}
        />

        <div className="berita-content">
            <h4>{title}</h4>
            <p className="berita-date">{date}</p>
            <Link to={link} className="card-link">
                Selengkapnya <IoArrowForwardOutline />
            </Link>
        </div>
    </div>
);

// ================= LANDING PAGE =================
function LandingPage() {
    return (
        <div className="landing-page-container">
            <Navbar />

            {/* ===== HERO ===== */}
            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Utamakan <span className="highlight-keselamatan">Keselamatan</span>, <br />
                        Jaga Keberlanjutan!
                    </h1>
                    <p className="hero-subtitle">
                        Sumber resmi peraturan, panduan praktis, dan sistem pelaporan terpadu untuk memastikan lingkungan kerja yang aman, produktif, dan berkesinambungan.
                    </p>
                    <div className="hero-actions">
                        <Link to="/informasi" className="btn-primary-pelajari">Pelajari K3</Link>
                        <Link to="/pengaduan" className="btn-secondary-pelajari">
                            Laporkan Insiden <IoArrowForwardOutline />
                        </Link>
                    </div>
                </div>

                <div className="hero-image-wrapper">
                    <img src={K3WorkerImage} alt="Pekerja K3" className="hero-image-worker" />
                </div>
            </header>

            {/* ===== LAYANAN ===== */}
            <section id="layanan" className="section-padding service-section">
                <span className="section-label">Layanan</span>
                <h2 className="section-title">Layanan K3</h2>
                <p className="section-subtitle">
                    Solusi lengkap untuk kepatuhan, edukasi, pelaporan, dan transparansi K3.
                </p>

                <div className="service-cards-container">
                    <ServiceCard
                        icon={IoWarningOutline}
                        title="Pengaduan Insiden"
                        description="Laporkan insiden atau potensi bahaya dengan cepat."
                        linkText="Selengkapnya"
                    />
                    <ServiceCard
                        icon={IoInformationCircleOutline}
                        title="Informasi"
                        description="Akses SOP, JSA, dan panduan K3 lengkap."
                        linkText="Selengkapnya"
                    />
                    <ServiceCard
                        icon={IoStatsChartOutline}
                        title="Data Statistik"
                        description="Pantau BNA, IFR, dan data K3 secara realtime."
                        linkText="Selengkapnya"
                    />
                </div>
            </section>

            {/* ===== CAROUSEL ===== */}
            <div className="section-padding">
                <Carousel />
            </div>

            {/* ===== DATA STATISTIK ===== */}
            <section id="data-statistik" className="section-padding data-statistik-section">
                <h2 className="section-title">Data Statistik K3</h2>
                <p className="section-subtitle">Transparansi data untuk monitoring implementasi K3.</p>

                <div className="stats-container">
                    <div className="stat-box green-border"><p>Penurunan Kecelakaan</p> <h2>15%</h2><p>Dari Tahun lalu</p></div>
                    <div className="stat-box blue-border"><p>Total Pendaftar</p> <h2>200</h2><p>Aktif</p></div>
                    <div className="stat-box purple-border"><p>Tingkat Kepatuhan</p> <h2>96%</h2><p>+1% dari Target</p></div>
                    <div className="stat-box orange-border"><p>Personil Tersertifikasi</p> <h2>3,847</h2><p>+254 bulan lalu</p></div>
                </div>

                <Link to="/data-statistik" className="btn-data-statistik">
                    Lihat Data Statistik Selengkapnya
                </Link>
            </section>

            {/* ===== BERITA TERKINI ===== */}
            <section id="berita" className="section-padding berita-terkini-section">
                <div className="berita-header">
                    <div className="berita-header-left">
                        <h2 className="section-title">Berita Terkini</h2>
                        <p className="section-subtitle">
                            Update seputar dunia K3 di Indonesia
                        </p>
                    </div>
                    <Link to="/berita" className="btn-lihat-semua">
                        Lihat Semua Berita <IoArrowForwardOutline />
                    </Link>
                </div>

                <div className="berita-grid">
                    <BeritaCard 
                        tag="Investigasi" 
                        title="Peraturan UU Ketenagakerjaan: Apa Dampaknya?"
                        date="28 November 2025" 
                        link="#" 
                        image={Artikel1}
                    />
                    <BeritaCard 
                        tag="Pendidikan" 
                        title="Simulasi Edukasi K3 untuk Pekerja Konstruksi"
                        date="28 November 2025" 
                        link="#" 
                        image={Artikel2}
                    />
                    <BeritaCard 
                        tag="Investigasi" 
                        title="Review Kepatuhan Penggunaan APD"
                        date="28 November 2025" 
                        link="#" 
                        image={Artikel3}
                    />
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="landing-footer">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo-worker-wrapper">
                            <img src={K3WorkerImage} className="footer-worker-image" />
                            <img src={K3TeamLogoWhite} className="footer-logo-text" />
                        </div>
                        <p>
                            Sistem terpadu untuk regulasi, pelatihan, pelaporan, dan data K3.
                            Menciptakan tempat kerja yang aman & produktif.
                        </p>
                        <div className="social-icons">
                            <a><IoLogoWhatsapp/></a>
                            <a><IoLogoInstagram/></a>
                            <a><IoMailOutline/></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h3>Layanan</h3>
                        <ul>
                            <li><a href="#pengaduan">Pengaduan</a></li>
                            <li><a href="#data-statistik">Data Statistik</a></li>
                            <li><a href="#berita">Berita</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h3>Kontak Kami</h3>
                        <p>Alamat: Jl. Jend. Sudirman No. 12</p>
                        <p>Email: kontak@k3team.id</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 K3Team. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
