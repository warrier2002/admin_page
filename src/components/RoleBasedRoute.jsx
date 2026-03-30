/**
 * RoleBasedRoute.jsx
 * ─────────────────────────────────────────────────────────────────
 * Guards routes that require specific roles.
 * → Not authenticated → redirect to /login
 * → Authenticated but wrong role → redirect to /unauthorized
 *
 * Usage:
 *   <RoleBasedRoute allowedRoles={['super_admin']} />
 */
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleBasedRoute({ allowedRoles }) {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasRole(allowedRoles)) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
