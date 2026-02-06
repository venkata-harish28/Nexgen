import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tenantAPI } from '../services/api';
import { 
  LogOut, Bell, AlertCircle, Home, CreditCard, 
  Utensils, DoorOpen, User, Menu, X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        announcements: announcements || [],
        complaints: complaints || [],
        rooms: rooms || [],
        payments: payments || [],
        leaveRequests: leaveRequests || [],
        menu: menu || []
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

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
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
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Left: Logo + Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              {/* Hamburger Menu Button - Mobile/Tablet */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Icon */}
              {iconLoaded ? (
                <img 
                  src="/Icon.png" 
                  alt="Hostel Icon" 
                  className="h-8 w-8 sm:h-10 sm:w-10 object-contain flex-shrink-0"
                  onError={() => setIconLoaded(false)}
                />
              ) : (
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex-shrink-0">
                  <User size={20} className="sm:hidden text-white" strokeWidth={2} />
                  <User size={24} className="hidden sm:block text-white" strokeWidth={2} />
                </div>
              )}

              {/* Title - Responsive */}
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                  {tenant?.name}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm truncate">
                  <span className="hidden sm:inline">Room </span>{tenant?.roomNumber}
                  <span className="hidden md:inline"> • {tenant?.location}</span>
                </p>
              </div>
            </div>

            {/* Right: Logout */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-xs sm:text-sm flex-shrink-0 ml-2"
            >
              <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Sidebar Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed left-0 top-0 bottom-0 w-64 bg-white shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-bold text-lg">Menu</h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
            <p className="text-blue-100 text-sm truncate">{tenant?.name}</p>
            <p className="text-blue-200 text-xs mt-1">
              Room {tenant?.roomNumber} • {tenant?.location}
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="p-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-all duration-200
                    ${activeTab === tab.id 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop Navigation Tabs */}
      <div className="hidden lg:block bg-white border-b border-gray-200 sticky top-[73px] z-10 shadow-sm">
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
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Active Tab Indicator */}
      <div className="lg:hidden bg-blue-50 border-b border-blue-200 px-4 py-2 sticky top-[65px] sm:top-[73px] z-10">
        <div className="flex items-center gap-2 text-blue-900">
          {React.createElement(tabs.find(t => t.id === activeTab)?.icon || Bell, { size: 18 })}
          <span className="font-semibold text-sm">
            {tabs.find(t => t.id === activeTab)?.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
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

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TenantDashboard;