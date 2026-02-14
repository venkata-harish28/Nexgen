import React, { useState, useEffect } from 'react';
import { DoorOpen, X, Check, Clock, CheckCircle2, XCircle, IndianRupee, Calendar, User, MapPin, Trash2 } from 'lucide-react';
import { ownerAPI } from '../../services/api';

const LeaveRequestsTab = ({ data, token, onUpdate }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Auto-delete requests older than 32 days on component mount
  useEffect(() => {
    const deleteOldRequests = async () => {
      const thirtyTwoDaysAgo = new Date();
      thirtyTwoDaysAgo.setDate(thirtyTwoDaysAgo.getDate() - 32);

      const oldRequests = data.filter(request => {
        const requestDate = new Date(request.createdAt || request.requestDate);
        return requestDate < thirtyTwoDaysAgo;
      });

      if (oldRequests.length > 0) {
        try {
          // Delete old requests
          for (const request of oldRequests) {
            await ownerAPI.deleteLeaveRequest(token, request._id);
          }
          // Refresh the data after deletion
          onUpdate();
        } catch (error) {
          console.error('Error deleting old requests:', error);
        }
      }
    };

    if (data && data.length > 0) {
      deleteOldRequests();
    }
  }, [data, token, onUpdate]);

  const handleUpdate = async (id, status, adminNotes, refundAmount) => {
    try {
      await ownerAPI.updateLeaveRequest(token, id, { status, adminNotes, refundAmount });
      setSelectedRequest(null);
      onUpdate();
    } catch (error) {
      console.error('Error updating leave request:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await ownerAPI.deleteLeaveRequest(token, id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting request:', error);
      }
    }
  };

  const getStatusConfig = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': 
        return {
          badge: 'bg-green-100 text-green-700',
          icon: CheckCircle2,
          iconColor: 'text-green-600',
          text: 'Approved'
        };
      case 'rejected': 
        return {
          badge: 'bg-red-100 text-red-700',
          icon: XCircle,
          iconColor: 'text-red-600',
          text: 'Rejected'
        };
      case 'pending': 
        return {
          badge: 'bg-amber-100 text-amber-700',
          icon: Clock,
          iconColor: 'text-amber-600',
          text: 'Pending'
        };
      default: 
        return {
          badge: 'bg-gray-100 text-gray-700',
          icon: Clock,
          iconColor: 'text-gray-600',
          text: status
        };
    }
  };

  const getDaysOld = (request) => {
    const requestDate = new Date(request.createdAt || request.requestDate);
    const now = new Date();
    return Math.floor((now - requestDate) / (1000 * 60 * 60 * 24));
  };

  // Sort by status (pending first) then by date
  const sortedRequests = [...data].sort((a, b) => {
    const statusOrder = { pending: 0, approved: 1, rejected: 2 };
    const statusA = statusOrder[a.status?.toLowerCase()] ?? 3;
    const statusB = statusOrder[b.status?.toLowerCase()] ?? 3;
    
    if (statusA !== statusB) return statusA - statusB;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Group by location
  const requestsByLocation = sortedRequests.reduce((acc, request) => {
    if (!acc[request.location]) {
      acc[request.location] = [];
    }
    acc[request.location].push(request);
    return acc;
  }, {});

  const locations = Object.keys(requestsByLocation).sort();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <DoorOpen size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Leave Requests</h3>
            <p className="text-sm text-gray-600">Manage tenant departure requests • Auto-deleted after 32 days</p>
          </div>
        </div>
      </div>
      
      {sortedRequests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center border border-gray-200">
          <DoorOpen size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Leave Requests</h3>
          <p className="text-gray-600">All tenants are currently staying</p>
        </div>
      ) : (
        <div className="space-y-6">
          {locations.map((location) => {
            const requests = requestsByLocation[location];
            
            return (
              <div key={location} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Location Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-gray-600" />
                    <span className="font-bold text-gray-900 text-lg">{location}</span>
                  </div>
                  <span className="px-4 py-1.5 bg-gray-200 text-gray-900 font-semibold text-sm rounded-lg">
                    {requests.length} request{requests.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Requests Grid */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requests.map(request => {
                    const config = getStatusConfig(request.status);
                    const Icon = config.icon;
                    const daysUntilLeave = Math.ceil((new Date(request.leaveDate) - new Date()) / (1000 * 60 * 60 * 24));
                    const daysOld = getDaysOld(request);
                    const daysUntilDeletion = 32 - daysOld;
                    
                    return (
                      <div 
                        key={request._id}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <User size={16} className="text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{request.tenantName}</h4>
                              <p className="text-xs text-gray-600">Room {request.roomNumber}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${config.badge}`}>
                              {config.text}
                            </span>
                            <button
                              onClick={() => handleDelete(request._id)}
                              className="p-1.5 hover:bg-red-100 rounded-lg transition-all group"
                              title="Delete request"
                            >
                              <Trash2 size={14} className="text-gray-400 group-hover:text-red-600" />
                            </button>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="text-gray-600">Leave Date:</span>
                            <span className="font-semibold text-gray-900">
                              {new Date(request.leaveDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          {daysUntilLeave >= 0 && (
                            <p className="text-xs text-gray-500">
                              {daysUntilLeave === 0 ? 'Leaving today' : `${daysUntilLeave} days until departure`}
                            </p>
                          )}
                          {daysUntilDeletion <= 7 && daysUntilDeletion > 0 && (
                            <div className="bg-orange-50 border border-orange-200 rounded-lg px-2 py-1">
                              <p className="text-xs text-orange-700 font-semibold">
                                ⚠️ Auto-deletes in {daysUntilDeletion} day{daysUntilDeletion !== 1 ? 's' : ''}
                              </p>
                            </div>
                          )}
                          {request.status?.toLowerCase() === 'approved' && request.refundAmount > 0 && (
                            <div className="flex items-center gap-2 text-sm bg-white px-3 py-2 rounded-lg border border-gray-200">
                              <IndianRupee size={14} className="text-gray-600" />
                              <span className="text-gray-600">Refund:</span>
                              <span className="font-bold text-gray-900">₹{request.refundAmount.toLocaleString('en-IN')}</span>
                            </div>
                          )}
                        </div>

                        {/* Reason */}
                        <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
                          <p className="text-xs font-semibold text-gray-600 mb-1">Reason</p>
                          <p className="text-sm text-gray-700 line-clamp-2">{request.reason}</p>
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-semibold"
                        >
                          {request.status?.toLowerCase() === 'pending' ? 'Review Request' : 'View Details'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedRequest && (
        <LeaveRequestModal 
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

const LeaveRequestModal = ({ request, onClose, onUpdate }) => {
  const [status, setStatus] = useState(request.status);
  const [adminNotes, setAdminNotes] = useState(request.adminNotes || '');
  const [refundAmount, setRefundAmount] = useState(request.refundAmount || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(request._id, status, adminNotes, parseFloat(refundAmount));
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-900 text-white px-6 py-5 flex justify-between items-center rounded-t-2xl">
          <div>
            <h3 className="text-2xl font-bold">Leave Request Details</h3>
            <p className="text-sm text-gray-300 mt-1">Review and process departure</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Tenant Information */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Tenant Name</p>
              <p className="text-base font-bold text-gray-900">{request.tenantName}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Room & Location</p>
              <p className="text-base font-bold text-gray-900">{request.roomNumber} - {request.location}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Leave Date</p>
              <p className="text-base font-bold text-gray-900">
                {new Date(request.leaveDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Request Date</p>
              <p className="text-base font-bold text-gray-900">
                {new Date(request.requestDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Reason */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">Reason for Leaving</p>
            <p className="text-gray-800 bg-gray-50 p-4 rounded-lg border border-gray-200">
              {request.reason}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Decision</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 font-semibold"
              >
                <option value="pending">Pending Review</option>
                <option value="approved">Approve Request</option>
                <option value="rejected">Reject Request</option>
              </select>
            </div>
            
            {status === 'approved' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Refund Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-600 font-bold">₹</span>
                  <input
                    type="number"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    placeholder="Enter refund amount"
                    min="0"
                    step="100"
                    className="w-full pl-8 pr-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 font-bold"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Calculate based on advance deposit minus outstanding dues
                </p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Notes {status === 'rejected' && <span className="text-red-600">*</span>}
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder={status === 'rejected' ? 
                  "Please provide a reason for rejection..." : 
                  "Add any notes or instructions for the tenant (optional)..."
                }
                rows="4"
                required={status === 'rejected'}
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 font-medium resize-none"
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <button 
                type="submit" 
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-semibold"
              >
                <Check size={18} />
                <span>Update Request</span>
              </button>
              <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold"
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

export default LeaveRequestsTab;