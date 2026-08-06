import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAdmin, isLandlord } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🏠 Rental House Management
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {user && isAdmin && <Link to="/admin">Admin Dashboard</Link>}
        {user && !isAdmin && !isLandlord && <Link to="/dashboard">Search Properties</Link>}
        {user && !isAdmin && isLandlord && <Link to="/landlord/dashboard">My Properties</Link>}

        {!user && (
          <>
            <Link to="/available-properties">Available Properties</Link>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-link">
              Register
            </Link>
          </>
        )}
        {user && (
          <div className="navbar-user">
            <span>
              {user.uname} <em>({user.role?.rname})</em>
            </span>
            <button className="btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}