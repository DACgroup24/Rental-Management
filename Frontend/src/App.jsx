import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import LandlordDashboard from './pages/LandlordDashboard';
import MyRequests from './components/landlord/MyRequests';
import PropertyDetails from './pages/PropertyDetails';
import AvailableProperties from './pages/AvailableProperties';
import AdminDashboard from './components/Admin/AdminDashboard';
import LandlordRequests from './components/Admin/LandlordRequest';
import ManageUsers from './components/Admin/ManageUsers';
import AdminLogout from './components/Admin/AdminLogout';

import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/available-properties" element={<AvailableProperties />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="USER">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin dashboard */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="users" element={<ManageUsers />} />
              <Route path="reports" element={<h1>Reports</h1>} />
              <Route path="landlords" element={<LandlordRequests />} />
              <Route path="logout" element={<AdminLogout />} />
            </Route>

            <Route
              path="/landlord/dashboard"
              element={
                <ProtectedRoute role="LANDLORD">
                  <LandlordDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/landlord/requests"
              element={
                <ProtectedRoute role="LANDLORD">
                  <MyRequests />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
