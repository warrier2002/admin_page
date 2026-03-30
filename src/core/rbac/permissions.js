import { ROLES } from './roles';

// Map: permission key → array of roles that hold it
export const PERMISSIONS = {
  // Dashboard
  canViewDashboard:   [ROLES.SUPER_ADMIN, ROLES.ADMIN],

  // Users
  canViewUsers:       [ROLES.SUPER_ADMIN],
  canCreateUser:      [ROLES.SUPER_ADMIN],
  canEditUser:        [ROLES.SUPER_ADMIN],
  canDeleteUser:      [ROLES.SUPER_ADMIN],
  canInviteUser:      [ROLES.SUPER_ADMIN, ROLES.ADMIN],

  // Profile
  canViewProfile:     [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER],

  // System
  canConfigureRoles:  [ROLES.SUPER_ADMIN],
  canViewAuditLogs:   [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  canSystemSettings:  [ROLES.SUPER_ADMIN],
};
