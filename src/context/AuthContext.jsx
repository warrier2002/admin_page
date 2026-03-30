import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const MOCK_DB = {
  'super@admin.com': { id: 1, name: 'Alex Thompson', email: 'super@admin.com', role: 'super_admin', avatar: 'AT' },
  'admin@admin.com': { id: 2, name: 'Jordan Lee',    email: 'admin@admin.com', role: 'admin',       avatar: 'JL' },
  'user@user.com':   { id: 3, name: 'Sam Rivera',    email: 'user@user.com',   role: 'user',         avatar: 'SR' },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user,  setUser]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); }
    catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const persist = (tok, usr) => {
    localStorage.setItem('token', tok);
    localStorage.setItem('user', JSON.stringify(usr));
    setToken(tok);
    setUser(usr);
  };

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Real API: uncomment when backend is ready
      // const { data } = await api.post('/auth/login', { email, password });

      // Mock fallback
      if (!MOCK_DB[email] || password !== 'password') throw new Error('Invalid credentials');
      const data = {
        token: `mock.jwt.${MOCK_DB[email].role}.${Date.now()}`,
        user:  MOCK_DB[email],
      };

      persist(data.token, data.user);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login', { replace: true });
  }, [navigate]);

  const hasRole = useCallback((roles) => {
    if (!user) return false;
    return (Array.isArray(roles) ? roles : [roles]).includes(user.role);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, token, loading, error, isAuthenticated: !!token && !!user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}

export default AuthContext;
