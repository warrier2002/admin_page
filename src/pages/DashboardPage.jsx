/**
 * DashboardPage.jsx
 * ─────────────────────────────────────────────────────────────────────────
 * Accessible to: admin, super_admin
 * Shows real-time operations overview matching "The Precise Monolith" design.
 */
import { useAuth } from '../context/AuthContext';

const STATS = [
  { label: 'Total Users',       value: '842,109', icon: 'group',         trend: '+12%' },
  { label: 'Active Sessions',   value: '1,248',   icon: 'wifi',          trend: '+5%'  },
  { label: 'Pending Requests',  value: '42',      icon: 'pending',       trend: '-8%'  },
  { label: 'Error Rate',        value: '0.034%',  icon: 'bug_report',    trend: '-2%'  },
];

const AUDIT_STREAM = [
  { icon: 'person_add', text: 'New super_admin invited',      sub: 'Marcus Aurelius invited by Alex T.',              time: '2 min ago',  type: 'info' },
  { icon: 'security',   text: 'Firewall Policy Updated',       sub: 'Strict mode enabled for IP segment 192.x',       time: '45 min ago', type: 'warning' },
  { icon: 'error',      text: 'Scheduled Backup Failure',      sub: 'Storage node 04 reported timeout error',         time: '2 hrs ago',  type: 'error' },
  { icon: 'logout',     text: 'System-wide Logoff',            sub: 'Automatic session clearing completed',           time: '4 hrs ago',  type: 'info' },
];

export default function DashboardPage() {
  const { user, hasRole } = useAuth();

  return (
    <div className="page">
      {/* Header */}
      <div className="page__header">
        <div>
          <h1 className="page__title">Operations Overview</h1>
          <p className="page__sub">Real-time health monitoring of the Precision Monolith ecosystem.</p>
        </div>
        {hasRole('super_admin') && (
          <span className="role-badge role-badge--super_admin">Super Admin Access</span>
        )}
      </div>

      {/* Stats grid */}
      <div className="stats-grid">
        {STATS.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-card__icon-wrap">
              <span className="material-symbols-outlined stat-card__icon">{s.icon}</span>
            </div>
            <div className="stat-card__body">
              <div className="stat-card__label">{s.label}</div>
              <div className="stat-card__value">{s.value}</div>
              <div className={`stat-card__trend ${s.trend.startsWith('-') ? 'stat-card__trend--down' : 'stat-card__trend--up'}`}>
                <span className="material-symbols-outlined">
                  {s.trend.startsWith('-') ? 'trending_down' : 'trending_up'}
                </span>
                {s.trend} vs last week
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content grid */}
      <div className="dashboard-grid">
        {/* Audit stream */}
        <div className="card">
          <div className="card__header">
            <h2 className="card__title">Audit Stream</h2>
            <button className="btn btn--ghost btn--sm">View all</button>
          </div>
          <div className="audit-list">
            {AUDIT_STREAM.map((e, i) => (
              <div key={i} className={`audit-item audit-item--${e.type}`}>
                <span className="material-symbols-outlined audit-item__icon">{e.icon}</span>
                <div className="audit-item__body">
                  <div className="audit-item__text">{e.text}</div>
                  <div className="audit-item__sub">{e.sub}</div>
                </div>
                <div className="audit-item__time">{e.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="card">
          <div className="card__header">
            <h2 className="card__title">Quick Actions</h2>
          </div>
          <div className="quick-actions">
            {hasRole(['super_admin', 'admin']) && (
              <button className="quick-action-btn">
                <span className="material-symbols-outlined">person_add</span>
                Add User
              </button>
            )}
            {hasRole('super_admin') && (
              <button className="quick-action-btn">
                <span className="material-symbols-outlined">security</span>
                Configure Roles
              </button>
            )}
            <button className="quick-action-btn">
              <span className="material-symbols-outlined">history</span>
              View Audit Logs
            </button>
            {hasRole('super_admin') && (
              <button className="quick-action-btn">
                <span className="material-symbols-outlined">settings</span>
                System Settings
              </button>
            )}
            <button className="quick-action-btn">
              <span className="material-symbols-outlined">download</span>
              Export Report
            </button>
          </div>

          {/* Role info card */}
          <div className="role-info-card">
            <span className="material-symbols-outlined">shield</span>
            <div>
              <div className="role-info-card__label">Your Access Level</div>
              <div className="role-info-card__role">{user?.role?.replace('_', ' ')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
