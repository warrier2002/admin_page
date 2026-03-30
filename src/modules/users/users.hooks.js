import { useState, useEffect, useCallback } from 'react';
import { usersApi }     from './users.api';
import { usersService } from './users.service';

const MOCK_USERS = [
  { id: 1, name: 'Alex Thompson',   email: 'alex@acme.io',    role: 'super_admin', status: 'Active',   lastLogin: '2 min ago'  },
  { id: 2, name: 'Jordan Lee',      email: 'jordan@acme.io',  role: 'admin',       status: 'Active',   lastLogin: '1 hr ago'   },
  { id: 3, name: 'Sam Rivera',      email: 'sam@acme.io',     role: 'user',        status: 'Active',   lastLogin: '3 hrs ago'  },
  { id: 4, name: 'Marcus Aurelius', email: 'marcus@acme.io',  role: 'admin',       status: 'Pending',  lastLogin: 'Never'      },
  { id: 5, name: 'Elena Vasquez',   email: 'elena@acme.io',   role: 'user',        status: 'Inactive', lastLogin: '2 days ago' },
];

export function useUsers() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await usersApi.list();
      setUsers(usersService.normalizeList(data));
    } catch {
      setUsers(usersService.normalizeList(MOCK_USERS));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const removeUser = useCallback(async (id) => {
    await usersApi.remove(id).catch(() => {});
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const createUser = useCallback(async (payload) => {
    const { data } = await usersApi.create(payload);
    setUsers((prev) => [...prev, usersService.normalize(data)]);
  }, []);

  const updateUser = useCallback(async (id, payload) => {
    const { data } = await usersApi.update(id, payload);
    setUsers((prev) => prev.map((u) => (u.id === id ? usersService.normalize(data) : u)));
  }, []);

  return { users, loading, error, refetch: fetchUsers, removeUser, createUser, updateUser };
}
