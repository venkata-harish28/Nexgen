import React, { useState } from 'react';
import { DoorOpen, X, Check } from 'lucide-react';
import { ownerAPI } from '../../services/api';

const LeaveRequestsTab = ({ data, token, onUpdate }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleUpdate = async (id, status, adminNotes, refundAmount) => {
    try {
      await ownerAPI.updateLeaveRequest(token, id, { status, adminNotes, refundAmount });
      setSelectedRequest(null);
      onUpdate();
    } catch (error) {
      console.error('Error updating leave request:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Leave Requests</h3>
      
      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <DoorOpen size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Leave Requests</h3>
          <p className="text-gray-600">No leave requests have been submitted</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tenant</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Leave Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Request Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map(request => (
                  <tr key={request._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm text-gray-900">{request.tenantName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{request.roomNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{request.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(request.leaveDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(request.requestDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors duration-200"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">Leave Request Details</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4 mb-8">
            <div>
              <span className="font-semibold text-gray-900">Tenant:</span>
              <span className="ml-2 text-gray-700">{request.tenantName}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Room:</span>
              <span className="ml-2 text-gray-700">{request.roomNumber} ({request.location})</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Expected Leave Date:</span>
              <span className="ml-2 text-gray-700">{new Date(request.leaveDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 block mb-2">Reason:</span>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{request.reason}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Submitted:</span>
              <span className="ml-2 text-gray-700">{new Date(request.requestDate).toLocaleString()}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            {status === 'approved' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Refund Amount</label>
                <input
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  placeholder="Enter refund amount"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Enter any notes for the tenant"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <button 
                type="submit" 
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Check size={18} />
                <span>Update</span>
              </button>
              <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
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