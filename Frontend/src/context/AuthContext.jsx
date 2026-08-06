import { createContext, useContext, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.getCurrentUser());

  const login = async (uname, password) => {
    const userData = await authService.login(uname, password);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // rid: 1 = Admin, 2 = Tenant/User, 3 = Landlord (matches RegisterForm dropdown values)
  const isAdmin = user?.role?.rid === 1;
  const isLandlord = user?.role?.rid === 3;
  const isUser = user?.role?.rid === 2;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAdmin, isLandlord, isUser, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}