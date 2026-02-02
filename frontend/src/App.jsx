import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TenantLogin from './pages/TenantLogin';
import TenantDashboard from './pages/TenantDashboard';
import TenantRooms from './components/tenant/TenantRooms'; // Add this import
import OwnerLogin from './pages/OwnerLogin';
import OwnerSignup from './pages/OwnerSignup';
import OwnerDashboard from './pages/OwnerDashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import NavBar from './pages/NavBar';
import Booking from './pages/Booking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tenant-login" element={<TenantLogin />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        <Route path="/tenant/rooms" element={<TenantRooms data={[]} />} /> {/* Add this route */}
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/owner-signup" element={<OwnerSignup />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/pages/contact" element={<Contact />} />
        <Route path="/pages/about" element={<About />} />
        <Route path="/pages/navbar" element={<NavBar />} />
        <Route path="/pages/booking" element={<Booking />} />

      </Routes>
    </Router>
  );
}

export default App;
//HST-A67675DD