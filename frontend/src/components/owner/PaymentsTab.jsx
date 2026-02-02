import React, { useState } from 'react';
import { CreditCard, MapPin, CheckCircle2, XCircle, Clock, Calendar, IndianRupee, AlertCircle, Users, TrendingUp } from 'lucide-react';

const PaymentsTab = ({ data, tenants = [] }) => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'paid', 'unpaid'

  const getStatusConfig = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed': 
        return {
          badge: 'bg-green-100 text-green-700 border-green-300',
          icon: CheckCircle2,
          iconColor: 'text-green-600',
          text: 'Paid'
        };
      case 'pending': 
        return {
          badge: 'bg-amber-100 text-amber-700 border-amber-300',
          icon: Clock,
          iconColor: 'text-amber-600',
          text: 'Pending'
        };
      case 'failed': 
        return {
          badge: 'bg-red-100 text-red-700 border-red-300',
          icon: XCircle,
          iconColor: 'text-red-600',
          text: 'Failed'
        };
      default: 
        return {
          badge: 'bg-gray-100 text-gray-700 border-gray-300',
          icon: Clock,
          iconColor: 'text-gray-600',
          text: status
        };
    }
  };

  // Get unique months from payments
  const getAvailableMonths = () => {
    const months = new Set();
    data.forEach(payment => {
      const date = new Date(payment.paymentDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthKey);
    });
    
    // Add current month if not present
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    months.add(currentMonth);
    
    return Array.from(months).sort().reverse();
  };

  const availableMonths = getAvailableMonths();

  // Filter payments by selected month
  const getPaymentsForMonth = () => {
    const [year, month] = selectedMonth.split('-');
    return data.filter(payment => {
      return payment.paymentYear === parseInt(year) && 
             payment.paymentMonth === new Date(year, month - 1).toLocaleString('en-US', { month: 'long' });
    });
  };

  const monthPayments = getPaymentsForMonth();

  // Create payment status map by location and tenant
  const createPaymentStatusMap = () => {
    const statusMap = {};
    
    // Safety check for tenants
    if (!tenants || tenants.length === 0) {
      return statusMap;
    }
    
    tenants.forEach(tenant => {
      if (!statusMap[tenant.location]) {
        statusMap[tenant.location] = [];
      }
      
      const [year, month] = selectedMonth.split('-');
      const monthName = new Date(year, month - 1).toLocaleString('en-US', { month: 'long' });
      
      const payment = monthPayments.find(p => 
        p.tenantName === tenant.name && 
        p.roomNumber === tenant.roomNumber &&
        p.location === tenant.location
      );
      
      statusMap[tenant.location].push({
        tenant,
        payment,
        status: payment ? payment.status : 'unpaid'
      });
    });
    
    // Sort tenants by room number within each location
    Object.keys(statusMap).forEach(location => {
      statusMap[location].sort((a, b) => a.tenant.roomNumber.localeCompare(b.tenant.roomNumber));
    });
    
    return statusMap;
  };

  const paymentStatusMap = createPaymentStatusMap();
  const locations = Object.keys(paymentStatusMap).sort();

  // Calculate stats for selected month
  const calculateMonthStats = () => {
    let totalExpected = 0;
    let totalCollected = 0;
    let paidCount = 0;
    let unpaidCount = 0;
    let pendingCount = 0;
    
    Object.values(paymentStatusMap).forEach(locationTenants => {
      locationTenants.forEach(({ tenant, payment, status }) => {
        totalExpected += tenant.rentAmount;
        
        if (status === 'completed') {
          totalCollected += payment.amount;
          paidCount++;
        } else if (status === 'pending') {
          pendingCount++;
        } else {
          unpaidCount++;
        }
      });
    });
    
    const collectionRate = totalExpected > 0 ? (totalCollected / totalExpected * 100).toFixed(1) : 0;
    
    return { totalExpected, totalCollected, paidCount, unpaidCount, pendingCount, collectionRate };
  };

  const stats = calculateMonthStats();

  // Get location stats
  const getLocationStats = (locationTenants) => {
    let totalExpected = 0;
    let totalCollected = 0;
    let paidCount = 0;
    let unpaidCount = 0;
    let pendingCount = 0;
    
    locationTenants.forEach(({ tenant, payment, status }) => {
      totalExpected += tenant.rentAmount;
      
      if (status === 'completed') {
        totalCollected += payment.amount;
        paidCount++;
      } else if (status === 'pending') {
        pendingCount++;
      } else {
        unpaidCount++;
      }
    });
    
    return { totalExpected, totalCollected, paidCount, unpaidCount, pendingCount, totalCount: locationTenants.length };
  };

  const formatMonthDisplay = (monthKey) => {
    const [year, month] = monthKey.split('-');
    return new Date(year, month - 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <CreditCard size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Payment Dashboard</h3>
              <p className="text-sm text-gray-600">Track tenant payments by month</p>
            </div>
          </div>
          
          {/* Month Selector */}
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-600" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {availableMonths.map(month => (
                <option key={month} value={month}>
                  {formatMonthDisplay(month)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              filterStatus === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Tenants ({stats.paidCount + stats.unpaidCount + stats.pendingCount})
          </button>
          <button
            onClick={() => setFilterStatus('paid')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              filterStatus === 'paid'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Paid ({stats.paidCount})
          </button>
          <button
            onClick={() => setFilterStatus('unpaid')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              filterStatus === 'unpaid'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Unpaid / Pending ({stats.unpaidCount + stats.pendingCount})
          </button>
        </div>
      </div>

      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase">Expected</span>
            <IndianRupee size={16} className="text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{stats.totalExpected.toLocaleString('en-IN')}</p>
        </div>
        
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase">Collected</span>
            <TrendingUp size={16} className="text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{stats.totalCollected.toLocaleString('en-IN')}</p>
        </div>
        
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase">Paid</span>
            <CheckCircle2 size={16} className="text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.paidCount}</p>
          <p className="text-xs text-gray-500 mt-1">{stats.collectionRate}% collection rate</p>
        </div>
        
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase">Unpaid</span>
            <AlertCircle size={16} className="text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.unpaidCount}</p>
        </div>
        
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase">Pending</span>
            <Clock size={16} className="text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.pendingCount}</p>
        </div>
      </div>

      {/* Payment Status by Location */}
      {!tenants || tenants.length === 0 ? (
        // Fallback: Show payments without tenant comparison
        data.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center border border-gray-200">
            <CreditCard size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">No Payment Records</h3>
            <p className="text-gray-600">Payment records will appear here once tenants make payments</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center border border-gray-200">
            <Users size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Tenant Data Required</h3>
            <p className="text-gray-600 mb-4">To see paid vs unpaid status, please pass the tenants prop to this component</p>
            <p className="text-sm text-gray-500">Showing {monthPayments.length} payment records for {formatMonthDisplay(selectedMonth)}</p>
          </div>
        )
      ) : (
        <div className="space-y-6">
          {locations.map((location) => {
            const locationTenants = paymentStatusMap[location];
            const locationStats = getLocationStats(locationTenants);
            
            // Apply filter
            let filteredTenants = locationTenants;
            if (filterStatus === 'paid') {
              filteredTenants = locationTenants.filter(t => t.status === 'completed');
            } else if (filterStatus === 'unpaid') {
              filteredTenants = locationTenants.filter(t => t.status !== 'completed');
            }
            
            // Skip location if no tenants match filter
            if (filteredTenants.length === 0) return null;
            
            // Separate paid and unpaid based on filter
            const unpaidTenants = filteredTenants.filter(t => t.status !== 'completed');
            const paidTenants = filteredTenants.filter(t => t.status === 'completed');
            
            return (
              <div key={location} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Location Header with Stats */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-gray-600" />
                      <span className="font-bold text-gray-900 text-lg">{location}</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Expected</p>
                        <p className="text-base font-bold text-gray-900">₹{locationStats.totalExpected.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="h-8 w-px bg-gray-300"></div>
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Collected</p>
                        <p className="text-base font-bold text-gray-900">₹{locationStats.totalCollected.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="h-8 w-px bg-gray-300"></div>
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Status</p>
                        <p className="text-base font-bold text-gray-900">{locationStats.paidCount}/{locationStats.totalCount} paid</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Unpaid Tenants Section */}
                {unpaidTenants.length > 0 && (
                  <div className="border-b border-gray-200">
                    <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={18} className="text-gray-600" />
                        <span className="font-bold text-gray-900">
                          Unpaid / Pending ({unpaidTenants.length})
                        </span>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Tenant</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Room</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Contact</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Expected Rent</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Payment Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {unpaidTenants.map(({ tenant, payment, status }) => {
                            const config = getStatusConfig(status);
                            const Icon = config.icon;
                            
                            return (
                              <tr key={tenant._id} className="hover:bg-gray-50 transition-colors bg-white">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <Users size={14} className="text-gray-600" />
                                    </div>
                                    <span className="font-semibold text-gray-900 text-sm">{tenant.name}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <span className="font-bold text-gray-900 text-sm">{tenant.roomNumber}</span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="space-y-0.5">
                                    <div className="text-xs text-gray-600">{tenant.email}</div>
                                    <div className="text-xs text-gray-600">{tenant.phone}</div>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-1">
                                    <IndianRupee size={14} className="text-gray-600" />
                                    <span className="font-bold text-gray-900 text-sm">
                                      {tenant.rentAmount.toLocaleString('en-IN')}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-1.5">
                                    <Icon size={14} className={config.iconColor} />
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${config.badge}`}>
                                      {status === 'unpaid' ? 'Not Paid' : config.text}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  {payment ? (
                                    <span className="text-xs text-gray-600 font-medium">
                                      {new Date(payment.paymentDate).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                      })}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-red-600 font-semibold">-</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Paid Tenants Section */}
                {paidTenants.length > 0 && (
                  <div>
                    <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-gray-600" />
                        <span className="font-bold text-gray-900">
                          Paid ({paidTenants.length})
                        </span>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Tenant</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Room</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Contact</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Amount Paid</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Method</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Payment Date</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Transaction ID</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {paidTenants.map(({ tenant, payment }) => (
                            <tr key={tenant._id} className="hover:bg-gray-50 transition-colors bg-white">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Users size={14} className="text-gray-600" />
                                  </div>
                                  <span className="font-semibold text-gray-900 text-sm">{tenant.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className="font-bold text-gray-900 text-sm">{tenant.roomNumber}</span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="space-y-0.5">
                                  <div className="text-xs text-gray-600">{tenant.email}</div>
                                  <div className="text-xs text-gray-600">{tenant.phone}</div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1">
                                  <IndianRupee size={14} className="text-gray-600" />
                                  <span className="font-bold text-gray-900 text-sm">
                                    {payment.amount.toLocaleString('en-IN')}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-xs text-gray-600 font-medium capitalize">
                                  {payment.paymentMethod}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-xs text-gray-600 font-medium">
                                  {new Date(payment.paymentDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                {payment.transactionId ? (
                                  <span className="text-xs text-gray-600 font-mono">
                                    {payment.transactionId.slice(0, 12)}...
                                  </span>
                                ) : (
                                  <span className="text-xs text-gray-400">-</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PaymentsTab;