/**
 * AppLayout.jsx
 * ─────────────────────────────────────────────────────────────────
 * Shared shell for all authenticated pages: Sidebar + Navbar + content.
 * Used by all protected routes via React Router's <Outlet />.
 */
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const PAGE_TITLES = {
  '/dashboard': 'Operations Overview',
  '/users':     'User Management',
  '/profile':   'User Profile',
};

export default function AppLayout() {
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] || 'Admin';

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-layout__main">
        <Navbar title={title} />
        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
