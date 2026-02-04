import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerAPI } from '../services/api';
import { LogOut, BarChart3, Bell, AlertCircle, Users, Home, CreditCard, DoorOpen, Utensils, User } from 'lucide-react';

// Import tab components
import DashboardTab from '../components/owner/DashboardTab';
import AnnouncementsTab from '../components/owner/AnnouncementsTab';
import ComplaintsTab from '../components/owner/ComplaintsTab';
import TenantsTab from '../components/owner/TenantsTab';
import PaymentsTab from '../components/owner/PaymentsTab';
import LeaveRequestsTab from '../components/owner/LeaveRequestsTab';
import RoomsTab from '../components/owner/RoomsTab';
import MenuTab from '../components/owner/MenuTab';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [owner, setOwner] = useState(null);
  const [stats, setStats] = useState(null);
  const [data, setData] = useState({
    announcements: [],
    complaints: [],
    tenants: [],
    payments: [],
    leaveRequests: [],
    menu: [],
    rooms: []
  });
  const [loading, setLoading] = useState(true);
  const [iconLoaded, setIconLoaded] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('ownerToken');
  const locations = ['all', 'Gachibowli', 'Gowlidobbi', 'Pocharam', 'Madhapur'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Update page title and favicon
  useEffect(() => {
    document.title = 'Owner Dashboard - Hostel Management';
    const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
    favicon.type = 'image/png';
    favicon.rel = 'icon';
    favicon.href = '/Icon.png';
    if (!document.querySelector("link[rel*='icon']")) {
      document.head.appendChild(favicon);
    }
  }, []);

  useEffect(() => {
    const ownerData = JSON.parse(localStorage.getItem('ownerData'));
    if (!token || !ownerData) {
      navigate('/owner-login');
      return;
    }
    setOwner(ownerData);
    loadData();
  }, [navigate, token, selectedLocation]);

  const loadData = async () => {
    try {
      const location = selectedLocation === 'all' ? undefined : selectedLocation;
      
      const [statsRes, announcements, complaints, tenants, payments, leaveRequests, menu, rooms] = await Promise.all([
        ownerAPI.getDashboardStats(token, location),
        ownerAPI.getAnnouncements(token, location),
        ownerAPI.getComplaints(token, location),
        ownerAPI.getTenants(token, location),
        ownerAPI.getPayments(token, location),
        ownerAPI.getLeaveRequests(token, location),
        ownerAPI.getMenu(token, location),
        ownerAPI.getRooms(token, location)
      ]);

      setStats(statsRes.data);
      
      // Sort menu by location first, then by day
      const sortedMenu = menu.data.sort((a, b) => {
        const locationComparison = locations.indexOf(a.location) - locations.indexOf(b.location);
        if (locationComparison !== 0) {
          return locationComparison;
        }
        return days.indexOf(a.day) - days.indexOf(b.day);
      });
      
      setData({
        announcements: announcements.data,
        complaints: complaints.data,
        tenants: tenants.data,
        payments: payments.data,
        leaveRequests: leaveRequests.data,
        menu: sortedMenu,
        rooms: rooms.data
      });
    } catch (error) {
      console.error('Error loading data:', error);
      if (error.response?.status === 401) {
        navigate('/owner-login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ownerToken');
    localStorage.removeItem('ownerData');
    navigate('/');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'complaints', label: 'Complaints', icon: AlertCircle },
    { id: 'tenants', label: 'Tenants', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'leave-requests', label: 'Leave Requests', icon: DoorOpen },
    { id: 'rooms', label: 'Rooms', icon: Home },
    { id: 'menu', label: 'Menu', icon: Utensils }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              {/* Icon or Fallback */}
              {iconLoaded ? (
                <img 
                  src="/Icon.png" 
                  alt="Hostel Icon" 
                  className="h-10 w-10 object-contain"
                  onError={() => setIconLoaded(false)}
                />
              ) : (
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <User size={24} className="text-white" strokeWidth={2} />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome, {owner?.name}</h2>
                <p className="text-gray-600 text-sm">Owner Dashboard</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-200"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors duration-200"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-4 transition-all duration-200 whitespace-nowrap border-b-2
                    ${activeTab === tab.id 
                      ? 'border-gray-900 text-gray-900 font-semibold' 
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <DashboardTab stats={stats} />}
        {activeTab === 'announcements' && (
          <AnnouncementsTab 
            data={data.announcements} 
            token={token} 
            selectedLocation={selectedLocation} 
            onUpdate={loadData} 
          />
        )}
        {activeTab === 'complaints' && (
          <ComplaintsTab 
            data={data.complaints} 
            token={token} 
            onUpdate={loadData} 
          />
        )}
        {activeTab === 'tenants' && (
          <TenantsTab 
            data={data.tenants} 
            token={token} 
            selectedLocation={selectedLocation} 
            onUpdate={loadData}
            rooms={data.rooms}
          />
        )}
        {activeTab === 'payments' && (
          <PaymentsTab 
            data={data.payments} 
            tenants={data.tenants} 
          />
        )}
        {activeTab === 'leave-requests' && (
          <LeaveRequestsTab 
            data={data.leaveRequests} 
            token={token} 
            onUpdate={loadData} 
          />
        )}
        {activeTab === 'rooms' && (
          <RoomsTab 
            data={data.rooms} 
            token={token} 
            selectedLocation={selectedLocation} 
            onUpdate={loadData} 
          />
        )}
        {activeTab === 'menu' && (
          <MenuTab 
            data={data.menu} 
            token={token} 
            selectedLocation={selectedLocation} 
            onUpdate={loadData} 
          />
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;