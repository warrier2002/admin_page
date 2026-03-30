import { Navigate, Outlet } from 'react-router-dom';
import { useAuth }        from '../modules/auth/auth.context';
import { usePermission }  from '../core/rbac/usePermission';

// Accept `permission` (string key from permissions.js) instead of raw role arrays
export default function RoleRoute({ permission }) {
  const { isAuthenticated } = useAuth();
  const { can } = usePermission();

  if (!isAuthenticated)    return <Navigate to="/login"        replace />;
  if (!can(permission))    return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
}
