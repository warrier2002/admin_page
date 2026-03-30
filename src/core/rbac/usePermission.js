import { useAuth } from '../../modules/auth/auth.context';
import { PERMISSIONS } from './permissions';

export function usePermission() {
  const { user } = useAuth();

  const can = (permission) => {
    if (!user?.role) return false;
    const allowed = PERMISSIONS[permission];
    if (!allowed) return false;
    return allowed.includes(user.role);
  };

  const canAny = (...perms) => perms.some(can);
  const canAll = (...perms) => perms.every(can);

  return { can, canAny, canAll };
}
