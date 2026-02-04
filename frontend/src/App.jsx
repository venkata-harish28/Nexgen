import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TenantLogin from './pages/TenantLogin';
import TenantDashboard from './pages/TenantDashboard';
import TenantRooms from './components/tenant/TenantRooms';
import OwnerLogin from './pages/OwnerLogin';
import OwnerSignup from './pages/OwnerSignup';
import OwnerDashboard from './pages/OwnerDashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import NavBar from './pages/NavBar';
import Booking from './pages/Booking';
import { TenantProtectedRoute, OwnerProtectedRoute, PublicRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* ==================== PUBLIC ROUTES ==================== */}
        <Route path="/" element={<Home />} />
        <Route path="/pages/contact" element={<Contact />} />
        <Route path="/pages/about" element={<About />} />
        <Route path="/pages/navbar" element={<NavBar />} />
        <Route path="/pages/booking" element={<Booking />} />
        
        {/* ==================== AUTH ROUTES ==================== */}
        {/* Tenant Login - Redirects to dashboard if already logged in */}
        <Route 
          path="/tenant-login" 
          element={
            <PublicRoute userType="tenant">
              <TenantLogin />
            </PublicRoute>
          } 
        />
        
        {/* Owner Login - Redirects to dashboard if already logged in */}
        <Route 
          path="/owner-login" 
          element={
            <PublicRoute userType="owner">
              <OwnerLogin />
            </PublicRoute>
          } 
        />
        
        {/* Owner Signup - Public access */}
        <Route path="/owner-signup" element={<OwnerSignup />} />
        
        {/* ==================== PROTECTED TENANT ROUTES ==================== */}
        <Route 
          path="/tenant-dashboard" 
          element={
            <TenantProtectedRoute>
              <TenantDashboard />
            </TenantProtectedRoute>
          } 
        />
        <Route 
          path="/tenant/rooms" 
          element={
            <TenantProtectedRoute>
              <TenantRooms data={[]} />
            </TenantProtectedRoute>
          } 
        />
        
        {/* ==================== PROTECTED OWNER ROUTES ==================== */}
        <Route 
          path="/owner-dashboard" 
          element={
            <OwnerProtectedRoute>
              <OwnerDashboard />
            </OwnerProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
//HST-A67675DD