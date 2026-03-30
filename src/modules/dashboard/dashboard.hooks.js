import { useState, useEffect } from 'react';
import { dashboardApi }     from './dashboard.api';
import { dashboardService } from './dashboard.service';

export function useDashboardStats() {
  const [stats,   setStats]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi.getStats()
      .then(({ data }) => setStats(dashboardService.normalizeStats(data)))
      .catch(()         => setStats(dashboardService.getMockStats()))
      .finally(()       => setLoading(false));
  }, []);

  return { stats, loading };
}

export function useAuditStream() {
  const [events,  setEvents]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi.getAuditStream()
      .then(({ data }) => setEvents(dashboardService.normalizeAudit(data)))
      .catch(()         => setEvents(dashboardService.getMockAudit()))
      .finally(()       => setLoading(false));
  }, []);

  return { events, loading };
}
