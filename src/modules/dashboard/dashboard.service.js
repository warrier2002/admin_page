const MOCK_STATS = [
  { label: 'Total Users',      value: '842,109', icon: 'group',      trend: '+12%' },
  { label: 'Active Sessions',  value: '1,248',   icon: 'wifi',       trend: '+5%'  },
  { label: 'Pending Requests', value: '42',      icon: 'pending',    trend: '-8%'  },
  { label: 'Error Rate',       value: '0.034%',  icon: 'bug_report', trend: '-2%'  },
];

const MOCK_AUDIT = [
  { icon: 'person_add', text: 'New super_admin invited',  sub: 'Marcus Aurelius invited by Alex T.',        time: '2 min ago',  type: 'info'    },
  { icon: 'security',   text: 'Firewall Policy Updated',   sub: 'Strict mode enabled for IP segment 192.x', time: '45 min ago', type: 'warning' },
  { icon: 'error',      text: 'Scheduled Backup Failure',  sub: 'Storage node 04 reported timeout error',   time: '2 hrs ago',  type: 'error'   },
  { icon: 'logout',     text: 'System-wide Logoff',        sub: 'Automatic session clearing completed',     time: '4 hrs ago',  type: 'info'    },
];

const normalizeStats = (raw) =>
  Array.isArray(raw)
    ? raw
    : [
        { label: 'Total Users',      value: String(raw.totalUsers      ?? raw.total_users      ?? 0), icon: 'group',      trend: raw.usersTrend      ?? '' },
        { label: 'Active Sessions',  value: String(raw.activeSessions  ?? raw.active_sessions  ?? 0), icon: 'wifi',       trend: raw.sessionsTrend   ?? '' },
        { label: 'Pending Requests', value: String(raw.pendingRequests ?? raw.pending_requests ?? 0), icon: 'pending',    trend: raw.requestsTrend   ?? '' },
        { label: 'Error Rate',       value: String(raw.errorRate       ?? raw.error_rate       ?? 0), icon: 'bug_report', trend: raw.errorTrend      ?? '' },
      ];

const normalizeAudit = (raw) =>
  Array.isArray(raw)
    ? raw.map((e) => ({
        icon: e.icon  || 'info',
        text: e.text  || e.message || '',
        sub:  e.sub   || e.detail  || '',
        time: e.time  || e.timestamp || '',
        type: e.type  || 'info',
      }))
    : MOCK_AUDIT;

export const dashboardService = {
  normalizeStats,
  normalizeAudit,
  getMockStats: () => MOCK_STATS,
  getMockAudit: () => MOCK_AUDIT,
};
