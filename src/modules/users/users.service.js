const normalize = (raw) => ({
  id:        raw.id,
  name:      raw.name,
  email:     raw.email,
  role:      raw.role,
  status:    raw.status   || 'Active',
  lastLogin: raw.lastLogin || raw.last_login || 'Never',
  avatar:    raw.avatar   || raw.name?.[0]?.toUpperCase() || '?',
});

export const usersService = {
  normalize,
  normalizeList: (list) => (Array.isArray(list) ? list : []).map(normalize),

  filterBySearch: (users, query) => {
    if (!query) return users;
    const q = query.toLowerCase();
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  },

  validatePayload: (payload) => {
    const errors = {};
    if (!payload.name?.trim())            errors.name   = 'Name is required';
    if (!payload.email?.includes('@'))    errors.email  = 'Valid email required';
    if (!payload.role)                    errors.role   = 'Role is required';
    return { valid: Object.keys(errors).length === 0, errors };
  },
};
