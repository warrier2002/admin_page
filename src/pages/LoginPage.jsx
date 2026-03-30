import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Both fields are required.'); return; }
    if (password.length < 8)  { setError('Password must be at least 8 characters.'); return; }
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-root">
      {/* Brand panel */}
      <div className="login-panel login-panel--brand">
        <div className="login-brand">
          <span className="material-symbols-outlined login-brand__icon">shield</span>
          <h1 className="login-brand__name">The Precise Monolith</h1>
          <p className="login-brand__sub">Sentinel Administrative Access</p>
        </div>
        <ul className="login-features">
          <li><span className="material-symbols-outlined">lock</span> JWT-based Authentication</li>
          <li><span className="material-symbols-outlined">manage_accounts</span> Role-Based Access Control</li>
          <li><span className="material-symbols-outlined">history</span> Immutable Audit Logs</li>
          <li><span className="material-symbols-outlined">security</span> Zero-Trust Architecture</li>
        </ul>
      </div>

      {/* Form panel */}
      <div className="login-panel login-panel--form">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <h2 className="login-form__title">Access Portal</h2>
          <p className="login-form__sub">Enter your credentials to continue</p>

          {error && (
            <div className="login-form__error" role="alert">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          <div className="login-form__hint">
            <strong>Demo accounts</strong><br />
            super@admin.com · admin@admin.com · user@user.com<br />
            Password: <code>password</code>
          </div>

          <div className="form-group">
            <label htmlFor="login-email" className="form-label">Email address</label>
            <div className="form-input-wrap">
              <span className="material-symbols-outlined form-input-icon">mail</span>
              <input
                id="login-email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password
              <button type="button" className="form-label__link">Forgot?</button>
            </label>
            <div className="form-input-wrap">
              <span className="material-symbols-outlined form-input-icon">lock</span>
              <input
                id="login-password"
                type={showPass ? 'text' : 'password'}
                className="form-input"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="form-input-toggle"
                onClick={() => setShowPass((v) => !v)}
                aria-label="Toggle password visibility"
              >
                <span className="material-symbols-outlined">
                  {showPass ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button id="login-submit" type="submit" className="btn btn--primary btn--full" disabled={loading}>
            {loading
              ? <span className="btn__spinner" />
              : <><span className="material-symbols-outlined">login</span> Sign In Securely</>
            }
          </button>

          <p className="login-form__footer">
            Don&rsquo;t have an account?{' '}
            <button type="button" className="link-btn">Request Access</button>
          </p>
        </form>

        <footer className="login-legal">
          © 2024 The Precise Monolith · Privacy Policy · Terms of Service
        </footer>
      </div>
    </div>
  );
}
