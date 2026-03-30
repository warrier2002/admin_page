import api from '../../core/api/axios';

export const usersApi = {
  list:   ()                   => api.get('/users'),
  getOne: (id)                 => api.get(`/users/${id}`),
  create: (payload)            => api.post('/users', payload),
  update: (id, payload)        => api.put(`/users/${id}`, payload),
  remove: (id)                 => api.delete(`/users/${id}`),
};
