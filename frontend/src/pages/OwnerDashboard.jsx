import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerAPI } from '../services/api';
import { LogOut, BarChart3, Bell, AlertCircle, Users, Home, CreditCard, DoorOpen, Utensils } from 'lucide-react';

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
  const navigate = useNavigate();

  const token = localStorage.getItem('ownerToken');
  const locations = ['all', 'Location A', 'Location B', 'Location C'];

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
      setData({
        announcements: announcements.data,
        complaints: complaints.data,
        tenants: tenants.data,
        payments: payments.data,
        leaveRequests: leaveRequests.data,
        menu: menu.data,
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
    navigate('/owner-login');
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white px-8 py-6">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Owner Dashboard</h2>
            <p className="text-gray-300 text-sm">Welcome back, {owner?.name}</p>
          </div>
          <div className="flex gap-4 items-center">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 rounded-lg border-none bg-white/15 text-white text-sm cursor-pointer focus:ring-2 focus:ring-white/30 focus:outline-none"
            >
              {locations.map(location => (
                <option key={location} value={location} className="text-gray-900">
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/15 hover:bg-white/25 transition-all duration-200"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto">
        <div className="container mx-auto px-8 flex gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-4 transition-all duration-200 whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'text-gray-900 font-semibold border-b-3 border-gray-900' 
                    : 'text-gray-500 hover:text-gray-700 border-b-3 border-transparent'
                  }
                `}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto p-8">
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
          />
        )}
        {activeTab === 'payments' && <PaymentsTab data={data.payments} />}
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