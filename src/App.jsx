import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider }   from './modules/auth/auth.context';
import PrivateRoute       from './components/PrivateRoute';
import RoleRoute          from './components/RoleRoute';
import AppLayout          from './components/AppLayout';
import LoginPage          from './pages/LoginPage';
import DashboardPage      from './pages/DashboardPage';
import UsersPage          from './pages/UsersPage';
import ProfilePage        from './pages/ProfilePage';
import UnauthorizedPage   from './pages/UnauthorizedPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/login"        element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Authenticated shell */}
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>

              {/* All authenticated users */}
              <Route path="/profile" element={<ProfilePage />} />

              {/* admin + super_admin */}
              <Route element={<RoleRoute permission="canViewDashboard" />}>
                <Route path="/dashboard" element={<DashboardPage />} />
              </Route>

              {/* super_admin only */}
              <Route element={<RoleRoute permission="canViewUsers" />}>
                <Route path="/users" element={<UsersPage />} />
              </Route>

            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
