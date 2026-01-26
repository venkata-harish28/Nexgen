import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TenantLogin from './pages/TenantLogin';
import TenantDashboard from './pages/TenantDashboard';
import OwnerLogin from './pages/OwnerLogin';
import OwnerSignup from './pages/OwnerSignup';
import OwnerDashboard from './pages/OwnerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tenant-login" element={<TenantLogin />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/owner-signup" element={<OwnerSignup />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;