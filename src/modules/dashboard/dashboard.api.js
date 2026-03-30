import api from '../../core/api/axios';

export const dashboardApi = {
  getStats:      () => api.get('/dashboard/stats'),
  getAuditStream: () => api.get('/dashboard/audit'),
};
