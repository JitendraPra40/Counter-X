import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cx_token'));
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('cx_admin');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((jwt, adminData) => {
    setToken(jwt);
    setAdmin(adminData);
    localStorage.setItem('cx_token', jwt);
    localStorage.setItem('cx_admin', JSON.stringify(adminData));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('cx_token');
    localStorage.removeItem('cx_admin');
  }, []);

  return (
    <AuthContext.Provider value={{ token, admin, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
