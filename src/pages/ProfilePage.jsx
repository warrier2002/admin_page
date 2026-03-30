/**
 * ProfilePage.jsx
 * ─────────────────────────────────────────────────────────────────────────
 * Accessible to: all authenticated users
 * Displays user profile info and role-based capabilities.
 */
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  const capabilities = {
    super_admin: ['View Dashboard', 'Manage Users', 'Configure Roles', 'Audit Logs', 'System Settings', 'Delete Users'],
    admin:       ['View Dashboard', 'View Users', 'Edit Profile', 'View Audit Logs'],
    user:        ['Edit Profile', 'View Own Activity'],
  };

  const caps = capabilities[user?.role] || [];

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">User Profile</h1>
          <p className="page__sub">Manage your account and view access permissions.</p>
        </div>
      </div>

      <div className="profile-grid">
        {/* Identity card */}
        <div className="card profile-card">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">{user?.avatar || user?.name?.[0]}</div>
            <button className="profile-avatar-edit" aria-label="Change photo">
              <span className="material-symbols-outlined">photo_camera</span>
            </button>
          </div>
          <h2 className="profile-card__name">{user?.name}</h2>
          <p className="profile-card__email">{user?.email}</p>
          <span className={`role-badge role-badge--${user?.role}`}>
            {user?.role?.replace('_', ' ')}
          </span>

          <div className="profile-meta">
            <div className="profile-meta__item">
              <span className="material-symbols-outlined">schedule</span>
              Member since Jan 2024
            </div>
            <div className="profile-meta__item">
              <span className="material-symbols-outlined">login</span>
              Last login: just now
            </div>
          </div>
        </div>

        {/* Settings + Capabilities */}
        <div>
          {/* Personal info */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card__header">
              <h2 className="card__title">Personal Information</h2>
              <button className="btn btn--ghost btn--sm">
                <span className="material-symbols-outlined">edit</span>Edit
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="form-input-wrap">
                  <span className="material-symbols-outlined form-input-icon">person</span>
                  <input className="form-input" defaultValue={user?.name} readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="form-input-wrap">
                  <span className="material-symbols-outlined form-input-icon">mail</span>
                  <input className="form-input" defaultValue={user?.email} readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <div className="form-input-wrap">
                  <span className="material-symbols-outlined form-input-icon">badge</span>
                  <input className="form-input" defaultValue={user?.role?.replace('_', ' ')} readOnly />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">User ID</label>
                <div className="form-input-wrap">
                  <span className="material-symbols-outlined form-input-icon">fingerprint</span>
                  <input className="form-input" defaultValue={`#${String(user?.id).padStart(6, '0')}`} readOnly />
                </div>
              </div>
            </div>
          </div>

          {/* Role capabilities */}
          <div className="card">
            <div className="card__header">
              <h2 className="card__title">Access Capabilities</h2>
            </div>
            <div className="caps-list">
              {caps.map((cap) => (
                <div key={cap} className="caps-item">
                  <span className="material-symbols-outlined caps-item__icon">check_circle</span>
                  {cap}
                </div>
              ))}
            </div>

            {/* Danger zone */}
            <div className="danger-zone">
              <h3 className="danger-zone__title">
                <span className="material-symbols-outlined">warning</span>
                Session Control
              </h3>
              <button className="btn btn--danger" onClick={logout}>
                <span className="material-symbols-outlined">logout</span>
                Sign Out of All Devices
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
