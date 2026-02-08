import React, { useState } from 'react';
import { DoorOpen, X, Calendar, FileText, AlertCircle } from 'lucide-react';
import { tenantAPI } from '../../services/api';

const TenantLeaveRequests = ({ data, passkey, tenant, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [formData, setFormData] = useState({
    leaveDate: '',
    reason: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await tenantAPI.submitLeaveRequest(passkey, formData);
      setShowForm(false);
      setFormData({ leaveDate: '', reason: '' });
      onUpdate();
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Failed to submit leave request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-emerald-500 text-white border-emerald-600';
      case 'rejected': return 'bg-red-500 text-white border-red-600';
      case 'pending': return 'bg-amber-500 text-white border-amber-600';
      default: return 'bg-gray-500 text-white border-gray-600';
    }
  };

  const getStatusBgColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-emerald-50 border-emerald-200';
      case 'rejected': return 'bg-red-50 border-red-200';
      case 'pending': return 'bg-amber-50 border-amber-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <DoorOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Leave Requests</h3>
              <p className="text-xs sm:text-sm text-gray-600">Manage your hostel leave requests</p>
            </div>
          </div>
          <button 
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-700 transition-all duration-200 font-semibold shadow-md"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Request Leave'}
          </button>
        </div>
      </div>

      {/* Leave Request Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8 border-2 border-green-700">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Submit Leave Request</h4>
            <button 
              onClick={() => setShowForm(false)}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
            </button>
          </div>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex items-start gap-2 sm:gap-3">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-blue-800 text-xs sm:text-sm">
              Please submit your leave request at least <strong>one month in advance</strong> to be eligible for a refund.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Expected Leave Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.leaveDate}
                onChange={(e) => setFormData({ ...formData, leaveDate: e.target.value })}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Reason for Leaving <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Please provide a detailed reason for leaving the hostel..."
                rows="6"
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                type="submit" 
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50 font-semibold shadow-md"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leave Requests Grid */}
      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 md:p-16 text-center border border-gray-200">
          <DoorOpen className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-30 text-gray-400" />
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-gray-900">No Leave Requests</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">You haven't submitted any leave requests yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {data.map(request => (
            <div 
              key={request._id} 
              className={`relative rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-200 border-2 ${getStatusBgColor(request.status)}`}
            >
              {/* Status Badge - Top Right Corner */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>

              {/* Header */}
              <div className="mb-3 sm:mb-4 pr-16 sm:pr-20">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Leave Request</h4>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                  <span className="font-semibold">Leave Date:</span>
                  <span className="font-bold text-gray-900">{formatDate(request.leaveDate)}</span>
                </div>
              </div>

              {/* Reason Preview */}
              <div className="mb-3 sm:mb-4">
                <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Reason:</p>
                <p className="text-xs sm:text-sm text-gray-700 line-clamp-3">
                  {request.reason}
                </p>
              </div>

              {/* Refund Amount */}
              {request.refundAmount > 0 && (
                <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-green-100 border-2 border-green-300 rounded-lg">
                  <p className="text-xs sm:text-sm font-bold text-green-800">
                    💰 Refund Amount: ₹{request.refundAmount.toLocaleString('en-IN')}
                  </p>
                </div>
              )}

              {/* Admin Notes Preview */}
              {request.adminNotes && (
                <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-white/80 border border-gray-300 rounded-lg">
                  <p className="text-xs font-bold text-gray-600 mb-1">Admin Notes:</p>
                  <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">{request.adminNotes}</p>
                </div>
              )}

              {/* Footer */}
              <div className="pt-3 sm:pt-4 border-t-2 border-gray-300 mb-3 sm:mb-4">
                <p className="text-xs text-gray-600">
                  Requested on <span className="font-semibold text-gray-900">{formatDate(request.createdAt)}</span>
                </p>
              </div>

              {/* View Details Button */}
              <button
                onClick={() => setSelectedRequest(request)}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-gradient-to-r from-green-700 to-green-800 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                View Full Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Results Count */}
      {data.length > 0 && (
        <div className="bg-white rounded-lg px-4 sm:px-6 py-3 sm:py-4 border border-gray-200 shadow-sm">
          <p className="text-xs sm:text-sm text-gray-600 text-center">
            Total <span className="font-bold text-gray-900">{data.length}</span> leave request{data.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Details Modal */}
      {selectedRequest && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 sm:p-4 z-50 backdrop-blur-sm"
          onClick={() => setSelectedRequest(null)}
        >
          <div 
            className="bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center rounded-t-xl md:rounded-t-2xl shadow-lg z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <DoorOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Leave Request Details</h3>
              </div>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 md:p-8">
              {/* Status Badge */}
              <div className="mb-4 sm:mb-6">
                <span className={`inline-flex px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold uppercase shadow-sm border-2 ${getStatusColor(selectedRequest.status)}`}>
                  {selectedRequest.status}
                </span>
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-gray-200">
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Tenant Name</p>
                  <p className="text-sm sm:text-base text-gray-900 font-semibold">{selectedRequest.tenantName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Room Number</p>
                  <p className="text-sm sm:text-base text-gray-900 font-semibold">{selectedRequest.roomNumber}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Leave Date</p>
                  <p className="text-sm sm:text-base text-gray-900 font-semibold">{formatDate(selectedRequest.leaveDate)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Request Date</p>
                  <p className="text-sm sm:text-base text-gray-900 font-semibold">{formatDate(selectedRequest.createdAt)}</p>
                </div>
              </div>

              {/* Reason */}
              <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">Reason for Leaving</p>
                <div className={`rounded-xl p-4 sm:p-6 border-2 ${getStatusBgColor(selectedRequest.status)}`}>
                  <p className="text-gray-900 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                    {selectedRequest.reason}
                  </p>
                </div>
              </div>

              {/* Refund Amount */}
              {selectedRequest.refundAmount > 0 && (
                <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-green-50 border-2 border-green-300 rounded-xl">
                  <p className="text-xs sm:text-sm font-semibold text-green-700 mb-1">Refund Amount</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-800">
                    ₹{selectedRequest.refundAmount.toLocaleString('en-IN')}
                  </p>
                </div>
              )}

              {/* Admin Notes */}
              {selectedRequest.adminNotes && (
                <div className="mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">Admin Response</p>
                  <div className="rounded-xl p-4 sm:p-6 bg-blue-50 border-2 border-blue-200">
                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                      {selectedRequest.adminNotes}
                    </p>
                  </div>
                </div>
              )}

              {/* Close Button */}
              <div className="mt-6 sm:mt-8">
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantLeaveRequests;