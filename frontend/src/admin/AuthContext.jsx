import { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin } from '../lib/api.js';
import api from '../lib/api.js';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/auth/me').then(({ data }) => setUser(data)).catch(() => localStorage.removeItem('admin_token')).finally(() => setReady(true));
    } else setReady(true);
  }, []);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    setUser({ _id: data._id, name: data.name, email: data.email });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return <AuthCtx.Provider value={{ user, ready, login, logout }}>{children}</AuthCtx.Provider>;
}
