import React from 'react';
import { Users, Home, AlertCircle, CreditCard, MapPin, TrendingUp, Clock } from 'lucide-react';

const DashboardTab = ({ stats, locationData = [] }) => {
  const occupancyPercentage = Math.round((stats?.occupiedRooms / stats?.totalRooms * 100) || 0);

  // Sample location data structure - you'll need to provide this from your backend
  const locations = locationData.length > 0 ? locationData : [
    { name: 'Main Building', revenue: 45000, growth: '+15%', tenants: 32, occupancy: 85 },
    { name: 'Annexe Block', revenue: 38000, growth: '+8%', tenants: 28, occupancy: 70 },
    { name: 'East Wing', revenue: 29000, growth: '+25%', tenants: 22, occupancy: 65 }
  ];

  // Monthly revenue data for the chart
  const monthlyData = [
    { month: 'Jan', actual: 52000, forecast: 50000 },
    { month: 'Feb', actual: 48000, forecast: 52000 },
    { month: 'Mar', actual: 55000, forecast: 54000 },
    { month: 'Apr', actual: 58000, forecast: 56000 },
    { month: 'May', actual: 62000, forecast: 60000 },
    { month: 'Jun', actual: 65000, forecast: 68000 },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => Math.max(d.actual, d.forecast)));

  // Occupancy segments for donut chart
  const occupancySegments = [
    { label: 'Occupied', percentage: 75, color: '#6366f1' },
    { label: 'Vacant', percentage: 15, color: '#8b5cf6' },
    { label: 'Maintenance', percentage: 10, color: '#ec4899' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h3 className="text-3xl font-bold mb-8 text-gray-900">Dashboard Overview</h3>
      
      {/* Top Stats Grid - 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Revenue by Location */}
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Main Building</p>
              <h2 className="text-3xl font-bold text-gray-900">₹45K</h2>
            </div>
            <MapPin size={24} className="text-blue-500" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+15%</span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        </div>

        {/* Revenue by Room Type */}
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Annexe Block</p>
              <h2 className="text-3xl font-bold text-gray-900">₹38K</h2>
            </div>
            <Home size={24} className="text-green-500" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+8%</span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        </div>

        {/* Revenue by Facilities */}
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">East Wing</p>
              <h2 className="text-3xl font-bold text-gray-900">₹29K</h2>
            </div>
            <CreditCard size={24} className="text-purple-500" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+25%</span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        </div>

        {/* Hostel Metrics */}
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Revenue per Tenant</p>
            <h2 className="text-3xl font-bold text-gray-900">₹4,200</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+8%</span>
            </div>
          </div>
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-1">Avg Occupancy Rate</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">73%</span>
              <span className="text-xs font-semibold text-green-600">+12%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Tenant Churn Rate</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">3.2%</span>
              <span className="text-xs font-semibold text-red-600">+0.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - 2 Large Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy by Location - Donut Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h4 className="text-xl font-bold mb-6 text-gray-900">Occupancy by Location</h4>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-64 h-64">
              {/* Donut Chart using CSS */}
              <svg viewBox="0 0 200 200" className="w-64 h-64 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="40"
                />
                
                {/* Occupied - Blue */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="40"
                  strokeDasharray="377 503"
                  strokeLinecap="round"
                />
                
                {/* Vacant - Purple */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="40"
                  strokeDasharray="75 503"
                  strokeDashoffset="-377"
                  strokeLinecap="round"
                />
                
                {/* Maintenance - Pink */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="40"
                  strokeDasharray="50 503"
                  strokeDashoffset="-452"
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Center label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{occupancyPercentage}%</div>
                  <div className="text-sm text-gray-600">Total Occupancy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
                <span className="text-gray-700">Main Building</span>
              </div>
              <span className="font-semibold text-gray-900">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <span className="text-gray-700">Annexe Block</span>
              </div>
              <span className="font-semibold text-gray-900">70%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                <span className="text-gray-700">East Wing</span>
              </div>
              <span className="font-semibold text-gray-900">65%</span>
            </div>
          </div>
        </div>

        {/* Monthly Revenue vs Target - Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-gray-900">Monthly Revenue vs Target</h4>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-indigo-500"></div>
                <span className="text-sm text-gray-600">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-pink-400"></div>
                <span className="text-sm text-gray-600">Target</span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-end justify-between gap-2 pb-8">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  {/* Bars container */}
                  <div className="w-full flex justify-center gap-1 items-end h-56">
                    {/* Actual bar */}
                    <div 
                      className="w-full bg-indigo-500 rounded-t transition-all duration-500 hover:bg-indigo-600"
                      style={{ 
                        height: `${(data.actual / maxRevenue) * 100}%`,
                        minHeight: '20px'
                      }}
                    ></div>
                    {/* Target bar */}
                    <div 
                      className="w-full bg-pink-400 rounded-t transition-all duration-500 hover:bg-pink-500"
                      style={{ 
                        height: `${(data.forecast / maxRevenue) * 100}%`,
                        minHeight: '20px'
                      }}
                    ></div>
                  </div>
                  {/* Month label */}
                  <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>

            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500 -ml-12">
              <span>₹{(maxRevenue / 1000).toFixed(0)}K</span>
              <span>₹{(maxRevenue / 2000).toFixed(0)}K</span>
              <span>₹0</span>
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pb-8 pointer-events-none">
              <div className="border-t border-gray-200"></div>
              <div className="border-t border-gray-200"></div>
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Users size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalTenants || 0}</p>
              <p className="text-sm text-gray-600">Total Tenants</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats?.pendingComplaints || 0}</p>
              <p className="text-sm text-gray-600">Pending Complaints</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Home size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats?.vacantRooms || 0}</p>
              <p className="text-sm text-gray-600">Vacant Rooms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;