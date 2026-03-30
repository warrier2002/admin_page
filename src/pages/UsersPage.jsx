import { useState }       from 'react';
import { useAuth }        from '../modules/auth/auth.context';
import { usePermission }  from '../core/rbac/usePermission';
import { useUsers }       from '../modules/users/users.hooks';
import { usersService }   from '../modules/users/users.service';

const RoleBadge   = ({ role })   => <span className={`role-badge role-badge--${role}`}>{role.replace('_', ' ')}</span>;
const StatusBadge = ({ status }) => <span className={`status-badge status-badge--${status.toLowerCase()}`}>{status}</span>;

export default function UsersPage() {
  const { can }                                          = usePermission();
  const { users, loading, removeUser }                   = useUsers();
  const [search, setSearch]                              = useState('');

  const filtered = usersService.filterBySearch(users, search);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">User Management</h1>
          <p className="page__sub">Manage all system users, roles, and access permissions.</p>
        </div>
        {can('canCreateUser') && (
          <button className="btn btn--primary">
            <span className="material-symbols-outlined">person_add</span>
            Invite User
          </button>
        )}
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
                        <div className="user-cell__avatar">{u.avatar}</div>
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
                        {can('canEditUser') && (
                          <button className="icon-btn" title="Edit">
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                        )}
                        {can('canDeleteUser') && (
                          <button className="icon-btn icon-btn--danger" title="Delete" onClick={() => removeUser(u.id)}>
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        )}
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
