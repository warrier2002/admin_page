import { NavLink }        from 'react-router-dom';
import { useAuth }        from '../modules/auth/auth.context';
import { usePermission }  from '../core/rbac/usePermission';

const NAV = [
  { to: '/dashboard', icon: 'dashboard',     label: 'Dashboard',       permission: 'canViewDashboard' },
  { to: '/users',     icon: 'group',          label: 'User Management', permission: 'canViewUsers'     },
  { to: '/profile',   icon: 'account_circle', label: 'Profile',         permission: 'canViewProfile'   },
];

export default function Sidebar() {
  const { user, logout }  = useAuth();
  const { can }           = usePermission();

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__brand-icon material-symbols-outlined">shield</span>
        <div>
          <div className="sidebar__brand-name">Sentinel Admin</div>
          <div className="sidebar__brand-tagline">Precise Control</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        {NAV.filter((item) => can(item.permission)).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar__nav-item${isActive ? ' sidebar__nav-item--active' : ''}`}
          >
            <span className="material-symbols-outlined sidebar__nav-icon">{item.icon}</span>
            <span className="sidebar__nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__user-avatar">{user?.avatar || user?.name?.[0]}</div>
          <div>
            <div className="sidebar__user-name">{user?.name}</div>
            <div className="sidebar__user-role">{user?.role?.replace('_', ' ')}</div>
          </div>
        </div>
        <button className="sidebar__logout" onClick={logout}>
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
