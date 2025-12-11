import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Splash.css";
import K3TeamLogo from "../../assets/images/logo-k3team.png"; 

// Durasi untuk setiap stage (dapat disesuaikan)
const STAGE_DURATION = 500; // 0.5 detik per stage
const FINAL_DURATION = 1500; // 1.5 detik di stage terakhir (Stage 8)

function Splash() {
  const [stage, setStage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    
    // --- Logic Transisi Stage Berantai ---
    
    if (stage <= 7) {
      // Pindah ke stage berikutnya setiap 0.5 detik
      timer = setTimeout(() => {
        setStage(s => s + 1);
      }, STAGE_DURATION);
    } 
    
    if (stage === 8) {
      // Di stage final, tunggu 1.5 detik lalu navigasi
      timer = setTimeout(() => {
        navigate('/landing'); 
      }, FINAL_DURATION);
    }

    return () => clearTimeout(timer);
  }, [stage, navigate]);

  // Tentukan konten yang akan ditampilkan di setiap stage
  const renderContent = () => {
    switch (stage) {
      case 1:
      case 2:
      case 3:
      case 4:
        return (
          <div className={`splash-shape splash-stage-${stage}`}></div>
        );
      
      case 5:
        return (
          <>
            <img src={K3TeamLogo} alt="K3 TEAM Logo" className="logo-img" />
            <h1 className="splash-welcome-text">Selamat Datang</h1>
          </>
        );
      
      case 6:
        return (
          <h1 className="full-screen-text">K3 TEAM</h1>
        );
      
      case 7:
        return (
          <img src={K3TeamLogo} alt="K3 TEAM Logo" className="logo-img large-logo" />
        );
        
      case 8:
        return (
          <>
            <img src={K3TeamLogo} alt="K3 TEAM Logo" className="logo-img" />
            <p className="splash-tagline">Utamakan Keselamatan, Jaga Keberlanjutan!</p>
          </>
        );
        
      default:
        return null;
    }
  };

  // Tentukan kelas CSS untuk container utama (mengubah latar belakang)
  const containerClass = `splash-container splash-stage-${stage}-bg`;

  return (
    <div className={containerClass}>
      <div className="splash-content-wrapper">
        {renderContent()}
      </div>
    </div>
  );
}

export default Splash;