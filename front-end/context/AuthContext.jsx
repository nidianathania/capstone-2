import { createContext, useContext } from 'react';

const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    user: null, // Data pengguna (misalnya, nama, email, role)
    login: () => {},
    logout: () => {},
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;