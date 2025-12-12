import React from 'react';
import '../Auth.css';

function VerificationModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Pendaftaran Akun Berhasil</h2>
                <p className="modal-message">
                    Tim kami sedang memverifikasi akun Anda. 
                    Anda akan mendapatkan notifikasi setelah proses selesai.
                </p>
                <button 
                    className="modal-button" 
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
}

export default VerificationModal;