/**
 * UnauthorizedPage.jsx
 * ─────────────────────────────────────────────────────────────────
 * Public route. Shown when a role-based check fails.
 */
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="error-page">
      <div className="error-page__content">
        <div className="error-page__code">403</div>
        <h1 className="error-page__title">Access Denied</h1>
        <p className="error-page__sub">
          You do not have the required permissions to view this resource.
          Unauthorized access attempts are logged and audited.
        </p>
        <div className="error-page__actions">
          <button className="btn btn--primary" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined">arrow_back</span>
            Go Back
          </button>
          {isAuthenticated ? (
            <button className="btn btn--ghost" onClick={() => navigate('/dashboard')}>
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </button>
          ) : (
            <button className="btn btn--ghost" onClick={() => navigate('/login')}>
              <span className="material-symbols-outlined">login</span>
              Sign In
            </button>
          )}
        </div>
        <div className="error-page__shield">
          <span className="material-symbols-outlined">gpp_bad</span>
        </div>
      </div>
    </div>
  );
}
