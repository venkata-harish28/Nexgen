import React from 'react';
import { Users, Home, AlertCircle, CreditCard, MapPin, TrendingUp, Clock, DollarSign, ArrowUpRight } from 'lucide-react';

const DashboardTab = ({ stats, locationData = [] }) => {
  const occupancyPercentage = Math.round((stats?.occupiedRooms / stats?.totalRooms * 100) || 0);

  // Sample location data structure
  const locations = locationData.length > 0 ? locationData : [
    { name: 'Main Building', revenue: 45000, growth: '+15%', tenants: 32, occupancy: 85 },
    { name: 'Annexe Block', revenue: 38000, growth: '+8%', tenants: 28, occupancy: 70 },
    { name: 'East Wing', revenue: 29000, growth: '+25%', tenants: 22, occupancy: 65 }
  ];

  // Monthly revenue data
  const monthlyData = [
    { month: 'Jan', actual: 52000, forecast: 50000 },
    { month: 'Feb', actual: 48000, forecast: 52000 },
    { month: 'Mar', actual: 55000, forecast: 54000 },
    { month: 'Apr', actual: 58000, forecast: 56000 },
    { month: 'May', actual: 62000, forecast: 60000 },
    { month: 'Jun', actual: 65000, forecast: 68000 },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => Math.max(d.actual, d.forecast)));

  return (
    <div className="space-y-6 font-sans" style={{ fontFamily: "'Poppins', 'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
      `}</style>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your hostel operations and performance</p>
      </div>
      
      {/* Main Stats Grid - 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Revenue Card */}
        <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <DollarSign size={24} className="text-blue-600" strokeWidth={2} />
            </div>
            <span className="flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md">
              <ArrowUpRight size={14} />
              12.5%
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
            <h2 className="text-3xl font-bold text-gray-900">₹{stats?.monthlyRevenue ? (stats.monthlyRevenue / 1000).toFixed(0) : '112'}K</h2>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </div>
        </div>

        {/* Active Tenants Card */}
        <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 bg-purple-50 rounded-lg">
              <Users size={24} className="text-purple-600" strokeWidth={2} />
            </div>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">
              Active
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Tenants</p>
            <h2 className="text-3xl font-bold text-gray-900">{stats?.totalTenants || 82}</h2>
            <p className="text-xs text-gray-500 mt-1">Across all locations</p>
          </div>
        </div>

        {/* Occupancy Rate Card */}
        <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 bg-green-50 rounded-lg">
              <Home size={24} className="text-green-600" strokeWidth={2} />
            </div>
            <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md">
              {occupancyPercentage}%
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Occupancy Rate</p>
            <h2 className="text-3xl font-bold text-gray-900">{stats?.occupiedRooms || 0}<span className="text-xl text-gray-400">/{stats?.totalRooms || 0}</span></h2>
            <p className="text-xs text-gray-500 mt-1">Rooms occupied</p>
          </div>
        </div>

        {/* Pending Items Card */}
        <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 bg-amber-50 rounded-lg">
              <AlertCircle size={24} className="text-amber-600" strokeWidth={2} />
            </div>
            <span className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-md">
              Urgent
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Pending Actions</p>
            <h2 className="text-3xl font-bold text-gray-900">{(stats?.pendingComplaints || 0) + (stats?.pendingLeaveRequests || 0)}</h2>
            <p className="text-xs text-gray-500 mt-1">{stats?.pendingComplaints || 0} complaints, {stats?.pendingLeaveRequests || 0} requests</p>
          </div>
        </div>
      </div>

      {/* Location Performance & Revenue Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Location Performance Cards */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Location Performance</h3>
          {locations.map((location, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${
                    index === 0 ? 'bg-blue-50' :
                    index === 1 ? 'bg-purple-50' :
                    'bg-green-50'
                  }`}>
                    <MapPin size={20} className={`${
                      index === 0 ? 'text-blue-600' :
                      index === 1 ? 'text-purple-600' :
                      'text-green-600'
                    }`} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">{location.name}</h4>
                    <p className="text-sm text-gray-500">{location.tenants} tenants</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-md">
                  <ArrowUpRight size={12} />
                  {location.growth}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-xs font-medium text-gray-600 mb-1">Revenue</p>
                  <p className="text-xl font-bold text-gray-900">₹{(location.revenue / 1000).toFixed(0)}K</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-xs font-medium text-gray-600 mb-1">Occupancy</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold text-gray-900">{location.occupancy}%</p>
                    <div className="flex-1">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            location.occupancy >= 80 ? 'bg-green-500' :
                            location.occupancy >= 60 ? 'bg-amber-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${location.occupancy}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Monthly Revenue</h3>
              <p className="text-sm text-gray-600">Actual vs Target performance</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-600 font-medium">Actual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                <span className="text-xs text-gray-600 font-medium">Target</span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-end justify-between gap-2 pb-8">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex justify-center gap-1 items-end h-56">
                    {/* Actual bar */}
                    <div className="relative flex-1 group">
                      <div 
                        className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600"
                        style={{ 
                          height: `${(data.actual / maxRevenue) * 100}%`,
                          minHeight: '24px'
                        }}
                      ></div>
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-0.5 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ₹{(data.actual / 1000).toFixed(0)}K
                      </div>
                    </div>
                    {/* Target bar */}
                    <div className="relative flex-1 group">
                      <div 
                        className="w-full bg-purple-400 rounded-t-lg transition-all duration-500 hover:bg-purple-500"
                        style={{ 
                          height: `${(data.forecast / maxRevenue) * 100}%`,
                          minHeight: '24px'
                        }}
                      ></div>
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-0.5 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ₹{(data.forecast / 1000).toFixed(0)}K
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 font-medium mt-1">{data.month}</span>
                </div>
              ))}
            </div>

            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500 font-medium -ml-12">
              <span>₹{(maxRevenue / 1000).toFixed(0)}K</span>
              <span>₹{(maxRevenue / 2000).toFixed(0)}K</span>
              <span>₹0</span>
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pb-8 pointer-events-none">
              <div className="border-t border-dashed border-gray-200"></div>
              <div className="border-t border-dashed border-gray-200"></div>
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardTab;