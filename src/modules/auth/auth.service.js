import { authApi } from './auth.api';

const MOCK_DB = {
  'super@admin.com': { id: 1, name: 'Alex Thompson', email: 'super@admin.com', role: 'super_admin', avatar: 'AT' },
  'admin@admin.com': { id: 2, name: 'Jordan Lee',    email: 'admin@admin.com', role: 'admin',       avatar: 'JL' },
  'user@user.com':   { id: 3, name: 'Sam Rivera',    email: 'user@user.com',   role: 'user',         avatar: 'SR' },
};

const normalizeUser = (raw) => ({
  id:     raw.id,
  name:   raw.name,
  email:  raw.email,
  role:   raw.role,
  avatar: raw.avatar || (raw.name ? raw.name.split(' ').map((p) => p[0]).join('').toUpperCase() : '?'),
});

const mockLogin = (email, password) => {
  if (!MOCK_DB[email] || password !== 'password') throw new Error('Invalid credentials');
  return {
    token: `mock.jwt.${MOCK_DB[email].role}.${Date.now()}`,
    user:  MOCK_DB[email],
  };
};

export const authService = {
  login: async (email, password) => {
    try {
      const { data } = await authApi.login({ email, password });
      return { token: data.token, user: normalizeUser(data.user) };
    } catch (err) {
      if (err.response) throw new Error(err.response.data?.message || 'Login failed');
      // Backend unreachable — use mock
      const data = mockLogin(email, password);
      return { token: data.token, user: normalizeUser(data.user) };
    }
  },

  normalizeUser,
};
