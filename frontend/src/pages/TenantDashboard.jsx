import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantAPI } from '../services/api';
import { 
  LogOut, Bell, AlertCircle, Home, CreditCard, 
  Utensils, DoorOpen, User
} from 'lucide-react';

// Import separate page components
import TenantAnnouncements from '../components/tenant/TenantAnnouncements';
import TenantComplaints from '../components/tenant/TenantComplaints';
import TenantRooms from '../components/tenant/TenantRooms';
import TenantPayments from '../components/tenant/TenantPayments';
import TenantLeaveRequests from '../components/tenant/TenantLeaveRequests';
import TenantMenu from '../components/tenant/TenantMenu';

const TenantDashboard = () => {
  const [activeTab, setActiveTab] = useState('announcements');
  const [tenant, setTenant] = useState(null);
  const [data, setData] = useState({
    announcements: [],
    complaints: [],
    rooms: [],
    payments: [],
    leaveRequests: [],
    menu: []
  });
  const [loading, setLoading] = useState(true);
  const [iconLoaded, setIconLoaded] = useState(true);
  const navigate = useNavigate();

  const passkey = localStorage.getItem('tenantPasskey');

  // Update page title and favicon
  useEffect(() => {
    document.title = 'Tenant Dashboard - Hostel Management';
    const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
    favicon.type = 'image/png';
    favicon.rel = 'icon';
    favicon.href = '/Icon.png';
    if (!document.querySelector("link[rel*='icon']")) {
      document.head.appendChild(favicon);
    }
  }, []);

  useEffect(() => {
    const tenantData = JSON.parse(localStorage.getItem('tenantData'));
    if (!passkey || !tenantData) {
      navigate('/tenant-login');
      return;
    }
    setTenant(tenantData);
    loadData();
  }, [navigate, passkey]);

  const loadData = async () => {
    try {
      const [announcements, complaints, rooms, payments, leaveRequests, menu] = await Promise.all([
        tenantAPI.getAnnouncements(passkey),
        tenantAPI.getComplaints(passkey),
        tenantAPI.getVacantRooms(passkey),
        tenantAPI.getPayments(passkey),
        tenantAPI.getLeaveRequests(passkey),
        tenantAPI.getMenu(passkey)
      ]);

      setData({
        announcements: announcements.data,
        complaints: complaints.data,
        rooms: rooms.data,
        payments: payments.data,
        leaveRequests: leaveRequests.data,
        menu: menu.data
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tenantPasskey');
    localStorage.removeItem('tenantData');
    navigate('/tenant-login');
  };

  const tabs = [
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'complaints', label: 'Complaints', icon: AlertCircle },
    { id: 'rooms', label: 'Vacant Rooms', icon: Home },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'leave', label: 'Leave Requests', icon: DoorOpen },
    { id: 'menu', label: 'Food Menu', icon: Utensils }
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
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome, {tenant?.name}</h2>
                <p className="text-gray-600 text-sm">
                  Room {tenant?.roomNumber} • {tenant?.location}
                </p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
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
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-gray-900 text-gray-900 font-semibold'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
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
        {activeTab === 'announcements' && (
          <TenantAnnouncements data={data.announcements} />
        )}
        {activeTab === 'complaints' && (
          <TenantComplaints 
            data={data.complaints} 
            passkey={passkey} 
            onUpdate={loadData} 
          />
        )}
        {activeTab === 'rooms' && (
          <TenantRooms data={data.rooms} />
        )}
        {activeTab === 'payments' && (
          <TenantPayments 
            data={data.payments} 
            passkey={passkey} 
            tenant={tenant} 
            onUpdate={loadData} 
          />
        )}
        {activeTab === 'leave' && (
          <TenantLeaveRequests 
            data={data.leaveRequests} 
            passkey={passkey} 
            tenant={tenant} 
            onUpdate={loadData} 
          />
        )}
        {activeTab === 'menu' && (
          <TenantMenu data={data.menu} />
        )}
      </div>
    </div>
  );
};

export default TenantDashboard;