import React, { useState, useEffect } from 'react';
import { AlertCircle, X, Check, AlertTriangle, Clock, CheckCircle2, MessageSquare } from 'lucide-react';
import { ownerAPI } from '../../services/api';

const ComplaintsTab = ({ data, token, onUpdate }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  const handleUpdateStatus = async (id, status, adminResponse) => {
    try {
      await ownerAPI.updateComplaint(token, id, { status, adminResponse });
      setSelectedComplaint(null);
      onUpdate();
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

  const getPriorityConfig = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': 
        return {
          badge: 'bg-gradient-to-r from-red-500 to-rose-600',
          icon: AlertTriangle,
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          border: 'border-red-400',
          bg: 'bg-gradient-to-br from-red-50 to-rose-50',
          cardBg: 'bg-red-50',
          cardBorder: 'border-red-300'
        };
      case 'medium': 
        return {
          badge: 'bg-gradient-to-r from-amber-500 to-orange-600',
          icon: AlertCircle,
          iconBg: 'bg-amber-100',
          iconColor: 'text-amber-600',
          border: 'border-amber-400',
          bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
          cardBg: 'bg-amber-50',
          cardBorder: 'border-amber-300'
        };
      case 'low': 
        return {
          badge: 'bg-gradient-to-r from-emerald-500 to-teal-600',
          icon: CheckCircle2,
          iconBg: 'bg-emerald-100',
          iconColor: 'text-emerald-600',
          border: 'border-emerald-400',
          bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
          cardBg: 'bg-emerald-50',
          cardBorder: 'border-emerald-300'
        };
      default: 
        return {
          badge: 'bg-gradient-to-r from-slate-500 to-gray-600',
          icon: AlertCircle,
          iconBg: 'bg-slate-100',
          iconColor: 'text-slate-600',
          border: 'border-slate-400',
          bg: 'bg-gradient-to-br from-slate-50 to-gray-50',
          cardBg: 'bg-slate-50',
          cardBorder: 'border-slate-300'
        };
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = isMobile ? "px-2 py-1 text-xs" : "px-4 py-1.5 text-xs";
    switch(status?.toLowerCase()) {
      case 'pending':
        return <span className={`${baseClasses} rounded-full font-bold bg-amber-500 text-white shadow-sm border border-amber-600 uppercase`}>⏳ Pending</span>;
      case 'in-progress':
        return <span className={`${baseClasses} rounded-full font-bold bg-blue-500 text-white shadow-sm border border-blue-600 uppercase`}>⚙️ In Progress</span>;
      case 'resolved':
        return <span className={`${baseClasses} rounded-full font-bold bg-emerald-500 text-white shadow-sm border border-emerald-600 uppercase`}>✓ Resolved</span>;
      case 'closed':
        return <span className={`${baseClasses} rounded-full font-bold bg-slate-500 text-white shadow-sm border border-slate-600 uppercase`}>✕ Closed</span>;
      default:
        return <span className={`${baseClasses} rounded-full font-bold bg-slate-400 text-white shadow-sm border border-slate-500 uppercase`}>{status}</span>;
    }
  };

  const getSortedComplaints = () => {
    const filtered = data.filter(complaint => {
      const status = complaint.status?.toLowerCase();
      return status !== 'resolved' && status !== 'closed';
    });

    return filtered.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityA = priorityOrder[a.priority?.toLowerCase()] ?? 3;
      const priorityB = priorityOrder[b.priority?.toLowerCase()] ?? 3;
      return priorityA - priorityB;
    });
  };

  const sortedComplaints = getSortedComplaints();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: isMobile ? 'short' : 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section - Responsive */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
        <div className="flex items-center gap-3 md:gap-4">
          <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md`}>
            <MessageSquare size={isMobile ? 20 : 24} className="text-white" />
          </div>
          <div>
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-900`}>Complaints</h3>
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Review and resolve tenant complaints</p>
          </div>
        </div>
      </div>

      {/* Complaints Grid - Responsive */}
      {sortedComplaints.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-16 text-center border border-gray-200">
          <CheckCircle2 size={isMobile ? 36 : 48} className="mx-auto mb-4 opacity-30 text-emerald-400" />
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-2 text-gray-900`}>All Clear!</h3>
          <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600`}>No pending complaints at this time</p>
        </div>
      ) : (
        <div className={`grid grid-cols-1 ${isTablet ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 md:gap-6`}>
          {sortedComplaints.map(complaint => {
            const config = getPriorityConfig(complaint.priority);
            const Icon = config.icon;
            
            return (
              <div 
                key={complaint._id}
                className={`relative rounded-xl p-4 md:p-5 shadow-sm hover:shadow-lg transition-all duration-200 border-2 ${config.cardBorder} ${config.cardBg}`}
              >
                {/* Priority Icon - Top Left */}
                <div className="absolute top-2 md:top-3 left-2 md:left-3">
                  <div className={`p-1.5 md:p-2 ${config.iconBg} rounded-lg shadow-sm border-2 ${config.border}`}>
                    <Icon size={isMobile ? 14 : 18} className={config.iconColor} />
                  </div>
                </div>

                {/* Status Badge - Top Right Corner */}
                <div className="absolute top-2 md:top-3 right-2 md:right-3">
                  {getStatusBadge(complaint.status)}
                </div>

                {/* Priority Badge */}
                <div className="mt-10 md:mt-12 mb-2 md:mb-3">
                  <span className={`inline-flex px-2 md:px-3 py-0.5 md:py-1 rounded-lg text-xs font-bold uppercase shadow-sm border ${config.badge} text-white`}>
                    {complaint.priority} Priority
                  </span>
                </div>

                {/* Subject */}
                <h4 className={`${isMobile ? 'text-sm' : 'text-base'} font-bold text-gray-900 mb-2 md:mb-3 pr-4 line-clamp-1`}>
                  {complaint.subject || 'No subject'}
                </h4>

                {/* Meta Information Grid */}
                <div className="grid grid-cols-2 gap-1.5 md:gap-2 mb-2 md:mb-3">
                  <div className="bg-white/60 rounded-lg p-1.5 md:p-2 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600">Tenant</p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-gray-900 truncate`}>{complaint.tenantName}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-1.5 md:p-2 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600">Room</p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-gray-900`}>{complaint.roomNumber}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-1.5 md:p-2 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600">Location</p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-gray-900 truncate`}>{complaint.location}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-1.5 md:p-2 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600">Category</p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-gray-900 truncate capitalize`}>{complaint.category}</p>
                  </div>
                </div>

                {/* Footer - Date */}
                <div className="pt-2 md:pt-3 border-t border-gray-300 mb-2 md:mb-3">
                  <p className="text-xs text-gray-600">
                    {formatDate(complaint.createdAt)} at {formatTime(complaint.createdAt)}
                  </p>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => setSelectedComplaint(complaint)}
                  className={`w-full px-3 md:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white ${isMobile ? 'text-xs' : 'text-sm'} font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm`}
                >
                  <MessageSquare size={isMobile ? 14 : 16} />
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Results Count */}
      {sortedComplaints.length > 0 && (
        <div className="bg-white rounded-lg px-4 md:px-6 py-3 md:py-4 border border-gray-200 shadow-sm">
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 text-center`}>
            Total <span className="font-bold text-gray-900">{sortedComplaints.length}</span> pending complaint{sortedComplaints.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {selectedComplaint && (
        <ComplaintModal 
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onUpdate={handleUpdateStatus}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}
    </div>
  );
};

const ComplaintModal = ({ complaint, onClose, onUpdate, isMobile, isTablet }) => {
  const [status, setStatus] = useState(complaint.status);
  const [adminResponse, setAdminResponse] = useState(complaint.adminResponse || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(complaint._id, status, adminResponse);
  };

  const getPriorityConfig = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': 
        return {
          bg: 'from-red-600 to-rose-700',
          icon: AlertTriangle,
          cardBg: 'bg-red-50',
          cardBorder: 'border-red-300'
        };
      case 'medium': 
        return {
          bg: 'from-amber-600 to-orange-700',
          icon: AlertCircle,
          cardBg: 'bg-amber-50',
          cardBorder: 'border-amber-300'
        };
      case 'low': 
        return {
          bg: 'from-emerald-600 to-teal-700',
          icon: CheckCircle2,
          cardBg: 'bg-emerald-50',
          cardBorder: 'border-emerald-300'
        };
      default: 
        return {
          bg: 'from-slate-600 to-gray-700',
          icon: AlertCircle,
          cardBg: 'bg-slate-50',
          cardBorder: 'border-slate-300'
        };
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 'bg-amber-500 text-white border-amber-600';
      case 'in-progress': return 'bg-blue-500 text-white border-blue-600';
      case 'resolved': return 'bg-emerald-500 text-white border-emerald-600';
      case 'closed': return 'bg-slate-500 text-white border-slate-600';
      default: return 'bg-gray-500 text-white border-gray-600';
    }
  };

  const config = getPriorityConfig(complaint.priority);
  const Icon = config.icon;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: isMobile ? 'short' : 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-50"
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-2xl shadow-2xl ${isMobile ? 'w-full' : 'max-w-3xl w-full'} max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`sticky top-0 bg-gradient-to-r ${config.bg} text-white px-4 md:px-6 py-4 md:py-5 flex justify-between items-center rounded-t-2xl shadow-lg z-10`}>
          <div className="flex items-center gap-2 md:gap-3">
            <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-white/20 rounded-lg flex items-center justify-center`}>
              <Icon size={isMobile ? 16 : 20} className="text-white" />
            </div>
            <div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>Complaint Details</h3>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold opacity-90`}>{complaint.priority?.toUpperCase()} PRIORITY</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 md:p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
          >
            <X size={isMobile ? 20 : 24} className="text-white" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 md:p-8">
          {/* Status Badge */}
          <div className="mb-4 md:mb-6">
            <span className={`inline-flex px-3 md:px-4 py-1.5 md:py-2 rounded-lg ${isMobile ? 'text-xs' : 'text-sm'} font-bold uppercase shadow-sm border-2 ${getStatusColor(complaint.status)}`}>
              {complaint.status}
            </span>
          </div>

          {/* Meta Information Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3 md:gap-4 mb-6 md:mb-8`}>
            <div className="bg-gray-50 rounded-lg p-3 md:p-4 border-2 border-gray-200">
              <p className="text-xs md:text-sm font-semibold text-gray-500 mb-1">Tenant Name</p>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-900 font-bold`}>{complaint.tenantName}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 md:p-4 border-2 border-gray-200">
              <p className="text-xs md:text-sm font-semibold text-gray-500 mb-1">Room & Location</p>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-900 font-bold`}>{complaint.roomNumber} - {complaint.location}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 md:p-4 border-2 border-gray-200">
              <p className="text-xs md:text-sm font-semibold text-gray-500 mb-1">Category</p>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-900 font-bold capitalize`}>{complaint.category}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 md:p-4 border-2 border-gray-200">
              <p className="text-xs md:text-sm font-semibold text-gray-500 mb-1">Submitted</p>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-900 font-bold`}>{formatDate(complaint.createdAt)}</p>
            </div>
          </div>

          {/* Subject */}
          <div className="mb-4 md:mb-6">
            <p className="text-xs md:text-sm font-bold text-gray-700 mb-2 md:mb-3 uppercase tracking-wide">Subject</p>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-gray-900 bg-gray-50 p-3 md:p-4 rounded-lg border-2 border-gray-200`}>
              {complaint.subject}
            </p>
          </div>

          {/* Description */}
          <div className="mb-4 md:mb-6">
            <p className="text-xs md:text-sm font-bold text-gray-700 mb-2 md:mb-3 uppercase tracking-wide">Description</p>
            <div className={`rounded-xl p-4 md:p-6 border-2 ${config.cardBorder} ${config.cardBg}`}>
              <p className={`text-gray-900 whitespace-pre-wrap leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>
                {complaint.description}
              </p>
            </div>
          </div>

          {/* Admin Response Form */}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 md:mb-3 uppercase tracking-wide">Update Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className={`w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-semibold text-gray-900 ${isMobile ? 'text-sm' : 'text-base'}`}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 md:mb-3 uppercase tracking-wide">Admin Response</label>
              <textarea
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                placeholder="Enter your response to the tenant..."
                rows={isMobile ? "4" : "5"}
                className={`w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-gray-900 resize-none ${isMobile ? 'text-sm' : 'text-base'}`}
              />
            </div>
            
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 md:gap-4 pt-2 md:pt-4`}>
              <button 
                type="submit" 
                className={`flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md font-semibold ${isMobile ? 'text-sm w-full' : 'text-base'}`}
              >
                <Check size={isMobile ? 18 : 20} />
                Update Complaint
              </button>
              <button 
                type="button" 
                onClick={onClose}
                className={`px-4 md:px-6 py-2.5 md:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold ${isMobile ? 'text-sm w-full' : 'text-base'}`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsTab;