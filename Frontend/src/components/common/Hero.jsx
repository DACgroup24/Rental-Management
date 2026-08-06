import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Hero() {
  const { user, isLandlord } = useAuth();

  return (
    <section className="hero">
      <h1>Search for your home</h1>
      <p>Browse verified listings by city and property type, or manage your own as a landlord.</p>
      {!user && (
        <div className="hero-actions">
          <Link to="/register" className="btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn-secondary">
            Login
          </Link>
          <Link to="/available-properties" className="btn-secondary">
            Available Properties
          </Link>
        </div>
      )}
      {user && !isLandlord && (
        <Link to="/dashboard" className="btn-primary">
          Search Properties
        </Link>
      )}
      {user && isLandlord && (
        <Link to="/landlord/dashboard" className="btn-primary">
          Manage My Properties
        </Link>
      )}
    </section>
  );
}
