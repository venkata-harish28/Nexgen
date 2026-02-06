import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerAPI } from '../services/api';
import { LogOut, BarChart3, Bell, AlertCircle, Users, Home, CreditCard, DoorOpen, Utensils, User, Menu, X } from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

      setStats(statsRes);
      
      const sortedMenu = Array.isArray(menu) ? [...menu].sort((a, b) => {
        const locationComparison = locations.indexOf(a.location) - locations.indexOf(b.location);
        if (locationComparison !== 0) {
          return locationComparison;
        }
        return days.indexOf(a.day) - days.indexOf(b.day);
      }) : [];
      
      setData({
        announcements: announcements || [],
        complaints: complaints || [],
        tenants: tenants || [],
        payments: payments || [],
        leaveRequests: leaveRequests || [],
        menu: sortedMenu,
        rooms: rooms || []
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

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
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
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Left: Logo + Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Hamburger Menu Button - Mobile/Tablet */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Icon */}
              {iconLoaded ? (
                <img 
                  src="/Icon.png" 
                  alt="Hostel Icon" 
                  className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                  onError={() => setIconLoaded(false)}
                />
              ) : (
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <User size={20} className="sm:hidden text-white" strokeWidth={2} />
                  <User size={24} className="hidden sm:block text-white" strokeWidth={2} />
                </div>
              )}

              {/* Title - Hidden on very small screens */}
              <div className="hidden xs:block">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate max-w-[120px] sm:max-w-none">
                  {owner?.name}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm hidden sm:block">Owner Dashboard</p>
              </div>
            </div>

            {/* Right: Location + Logout */}
            <div className="flex gap-2 sm:gap-3 items-center">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-xs sm:text-sm cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-200"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All' : location}
                  </option>
                ))}
              </select>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors duration-200 text-xs sm:text-sm"
              >
                <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
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
            <p className="text-blue-100 text-sm">{owner?.name}</p>
          </div>

          {/* Navigation Items */}
          <nav className="p-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
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
                  className={`
                    flex items-center gap-2 px-4 py-4 transition-all duration-200 whitespace-nowrap border-b-2
                    ${activeTab === tab.id 
                      ? 'border-gray-900 text-gray-900 font-semibold' 
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
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
      </div>

      {/* Mobile Active Tab Indicator */}
      <div className="lg:hidden bg-blue-50 border-b border-blue-200 px-4 py-2 sticky top-[65px] sm:top-[73px] z-10">
        <div className="flex items-center gap-2 text-blue-900">
          {React.createElement(tabs.find(t => t.id === activeTab)?.icon || Home, { size: 18 })}
          <span className="font-semibold text-sm">
            {tabs.find(t => t.id === activeTab)?.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {activeTab === 'dashboard' && <DashboardTab stats={stats} currentLocation={selectedLocation} token={token} />}
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

export default OwnerDashboard;