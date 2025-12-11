import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
    // Cek token di Local Storage saat aplikasi dimuat pertama kali
    const initialToken = localStorage.getItem('authToken');

    const [token, setToken] = useState(initialToken);
    const [user, setUser] = useState(null); // Simpan data user di sini

    const isLoggedIn = !!token; // Mengubah token (string/null) menjadi boolean

    // Fungsi untuk menangani proses login
    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('authToken', newToken); // Simpan token
        // Opsi: localStorage.setItem('userData', JSON.stringify(userData));
    };

    // Fungsi untuk menangani proses logout
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken'); // Hapus token
        // Opsi: localStorage.removeItem('userData');
    };

    // Nilai Context yang akan diakses oleh komponen lain
    const contextValue = {
        isLoggedIn,
        token,
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;