import React from 'react';
import { Users, Home, AlertCircle, CreditCard, DoorOpen } from 'lucide-react';

const DashboardTab = ({ stats }) => {
  const occupancyPercentage = Math.round((stats?.occupiedRooms / stats?.totalRooms * 100) || 0);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-8 text-gray-900">Overview</h3>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md transition-shadow duration-200">
          <Users size={40} className="text-blue-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-2 text-gray-900">{stats?.totalTenants || 0}</h2>
          <p className="text-gray-600">Total Tenants</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md transition-shadow duration-200">
          <Home size={40} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-2 text-gray-900">{stats?.vacantRooms || 0}</h2>
          <p className="text-gray-600">Vacant Rooms</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md transition-shadow duration-200">
          <AlertCircle size={40} className="text-yellow-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-2 text-gray-900">{stats?.pendingComplaints || 0}</h2>
          <p className="text-gray-600">Pending Complaints</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md transition-shadow duration-200">
          <CreditCard size={40} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-2 text-gray-900">₹{stats?.monthlyRevenue || 0}</h2>
          <p className="text-gray-600">Monthly Revenue</p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Occupancy */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h4 className="text-xl font-bold mb-6 text-gray-900">Room Occupancy</h4>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-5xl font-bold mb-2 text-gray-900">
                {stats?.occupiedRooms || 0}/{stats?.totalRooms || 0}
              </p>
              <p className="text-gray-600">Occupied Rooms</p>
            </div>
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="#1a1a1a"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${occupancyPercentage * 3.27} ${327 - occupancyPercentage * 3.27}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{occupancyPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h4 className="text-xl font-bold mb-6 text-gray-900">Recent Activity</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} className="text-yellow-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  {stats?.pendingComplaints || 0} Pending Complaints
                </p>
                <p className="text-sm text-gray-600">Need attention</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <DoorOpen size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  {stats?.pendingLeaveRequests || 0} Leave Requests
                </p>
                <p className="text-sm text-gray-600">Awaiting approval</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;