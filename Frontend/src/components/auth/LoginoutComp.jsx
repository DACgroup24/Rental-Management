import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Combined Login / Logout component.
// - If nobody is logged in, it renders a login form.
// - If a user is already logged in, it renders their info + a Logout button.
//
// Uses the app's existing AuthContext (useAuth), the same pattern already
// used by Navbar.jsx and ProtectedRoute.jsx, so the user state stays in
// sync across the whole app. This intentionally avoids react-redux, which
// isn't installed in this project.
export default function LoginoutComp() {
  const { user, login, logout, isLandlord } = useAuth();
  const navigate = useNavigate();

  const [uname, setUname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const loggedInUser = await login(uname, password);

      // Redirect based on role (rid: 2 = Tenant/User, 3 = Landlord)
      if (loggedInUser?.role?.rid === 3) {
        navigate('/landlord/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Login failed. Please check your username and password.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Already logged in -> show user info + logout button
  if (user) {
    return (
      <div className="auth-form">
        <h2>Welcome, {user.uname}</h2>
        <p>
          Logged in as <em>{user.role?.rname}</em>
        </p>
        <button className="btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  // Not logged in -> show login form
  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <h2>Login</h2>

      {error && <p className="status-msg error">{error}</p>}

      <div className="form-row">
        <label>Username</label>
        <input
          type="text"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
