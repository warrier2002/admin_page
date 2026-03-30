import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { to: '/dashboard', icon: 'dashboard',     label: 'Dashboard',       roles: ['super_admin', 'admin'] },
  { to: '/users',     icon: 'group',          label: 'User Management', roles: ['super_admin'] },
  { to: '/profile',   icon: 'account_circle', label: 'Profile',         roles: ['super_admin', 'admin', 'user'] },
];

export default function Sidebar() {
  const { user, logout, hasRole } = useAuth();

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
        {NAV.filter((item) => hasRole(item.roles)).map((item) => (
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
