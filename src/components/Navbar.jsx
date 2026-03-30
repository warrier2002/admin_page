/**
 * Navbar.jsx
 * ────────────────────────────────────────────────────────────────
 * Top navigation bar with search, notifications, and user menu.
 * Logout button wired to AuthContext.
 */
import { useState } from 'react';
import { useAuth } from '../modules/auth/auth.context';

export default function Navbar({ title = 'Dashboard' }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      {/* Page title */}
      <div className="navbar__title">{title}</div>

      {/* Right-side actions */}
      <div className="navbar__actions">
        {/* Search */}
        <div className="navbar__search">
          <span className="material-symbols-outlined">search</span>
          <input placeholder="Search..." />
        </div>



        {/* User menu */}
        <div className="navbar__user-menu">
          <button
            className="navbar__avatar-btn"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <div className="navbar__avatar">{user?.avatar || user?.name?.[0]}</div>
            <span className="material-symbols-outlined">expand_more</span>
          </button>

          {menuOpen && (
            <div className="navbar__dropdown">
              <div className="navbar__dropdown-header">
                <strong>{user?.name}</strong>
                <span>{user?.email}</span>
                <span className="role-badge role-badge--{user?.role}">{user?.role?.replace('_', ' ')}</span>
              </div>
              <button className="navbar__dropdown-item" onClick={logout}>
                <span className="material-symbols-outlined">logout</span>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
