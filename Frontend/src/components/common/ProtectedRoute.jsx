import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Wrap a page with this to require login, and optionally a specific role.
// Usage: <ProtectedRoute role="LANDLORD"><LandlordDashboard /></ProtectedRoute>
//
// NOTE: `user.role` (from the backend) is an object like
// { rid: 3, rname: "Landlord" }, not a plain string. AuthContext already
// derives `isLandlord` / `isUser` booleans from `user.role.rid` for
// exactly this reason, so we check role membership through those
// instead of comparing user.role directly to the `role` string prop.
export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, isAdmin, isLandlord, isUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'LANDLORD' && !isLandlord) {
    return <Navigate to="/" replace />;
  }

  if (role === 'USER' && !isUser) {
    return <Navigate to="/" replace />;
  }

  if (role === 'ADMIN' && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
