import { useState, useEffect } from 'react';
import api from '../api/axios';

const MOCK_USERS = [
  { id: 1, name: 'Alex Thompson',   email: 'alex@acme.io',    role: 'super_admin', status: 'Active',   lastLogin: '2 min ago'  },
  { id: 2, name: 'Jordan Lee',      email: 'jordan@acme.io',  role: 'admin',       status: 'Active',   lastLogin: '1 hr ago'   },
  { id: 3, name: 'Sam Rivera',      email: 'sam@acme.io',     role: 'user',        status: 'Active',   lastLogin: '3 hrs ago'  },
  { id: 4, name: 'Marcus Aurelius', email: 'marcus@acme.io',  role: 'admin',       status: 'Pending',  lastLogin: 'Never'      },
  { id: 5, name: 'Elena Vasquez',   email: 'elena@acme.io',   role: 'user',        status: 'Inactive', lastLogin: '2 days ago' },
];

const RoleBadge = ({ role }) => (
  <span className={`role-badge role-badge--${role}`}>{role.replace('_', ' ')}</span>
);

const StatusBadge = ({ status }) => (
  <span className={`status-badge status-badge--${status.toLowerCase()}`}>{status}</span>
);

export default function UsersPage() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');

  useEffect(() => {
    api.get('/users')
      .then(({ data }) => setUsers(data))
      .catch(() => { console.warn('Backend unavailable – using mock data'); setUsers(MOCK_USERS); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">User Management</h1>
          <p className="page__sub">Manage all system users, roles, and access permissions.</p>
        </div>
        <button className="btn btn--primary">
          <span className="material-symbols-outlined">person_add</span>
          Invite User
        </button>
      </div>

      <div className="card">
        <div className="table-toolbar">
          <div className="form-input-wrap table-toolbar__search">
            <span className="material-symbols-outlined form-input-icon">search</span>
            <input
              className="form-input"
              placeholder="Search users…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="table-toolbar__actions">
            <button className="btn btn--ghost btn--sm">
              <span className="material-symbols-outlined">filter_list</span>Filter
            </button>
            <button className="btn btn--ghost btn--sm">
              <span className="material-symbols-outlined">download</span>Export
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading users…</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th><th>Role</th><th>Status</th><th>Last Login</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-cell__avatar">{u.name[0]}</div>
                        <div>
                          <div className="user-cell__name">{u.name}</div>
                          <div className="user-cell__email">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><RoleBadge role={u.role} /></td>
                    <td><StatusBadge status={u.status} /></td>
                    <td className="table-sub">{u.lastLogin}</td>
                    <td>
                      <div className="table-actions">
                        <button className="icon-btn" title="Edit">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className="icon-btn icon-btn--danger" title="Delete">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="empty-state">
                <span className="material-symbols-outlined">search_off</span>
                <p>No users match your search.</p>
              </div>
            )}

            <div className="table-footer">Showing {filtered.length} of {users.length} users</div>
          </div>
        )}
      </div>
    </div>
  );
}
