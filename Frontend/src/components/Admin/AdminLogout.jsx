import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Logs the admin out and redirects to home. Uses the app's AuthContext
// (same as Navbar.jsx / LoginoutComp.jsx) rather than Redux, which isn't
// installed in this project.
export default function AdminLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Logging out...</div>;
}
