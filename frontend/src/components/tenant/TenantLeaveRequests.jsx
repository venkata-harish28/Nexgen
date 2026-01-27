import React, { useState } from 'react';
import { DoorOpen } from 'lucide-react';
import { tenantAPI } from '../../services/api';

const TenantLeaveRequests = ({ data, passkey, tenant, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
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
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Leave Requests</h3>
        <button 
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Request Leave'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h4 className="text-xl font-bold mb-6 text-gray-900">Submit Leave Request</h4>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              Please submit your leave request at least one month in advance to be eligible for a refund.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Leave Date</label>
              <input
                type="date"
                value={formData.leaveDate}
                onChange={(e) => setFormData({ ...formData, leaveDate: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Please provide a reason for leaving"
                rows="4"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            
            <button 
              type="submit" 
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      )}

      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <DoorOpen size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Leave Requests</h3>
          <p className="text-gray-600">You haven't submitted any leave requests yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map(request => (
            <div key={request._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-bold text-gray-900">Leave Request</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                <strong>Leave Date:</strong> {new Date(request.leaveDate).toLocaleDateString()}
              </p>
              
              <p className="text-gray-700 mb-4">
                <strong>Reason:</strong> {request.reason}
              </p>
              
              {request.refundAmount > 0 && (
                <p className="text-sm text-green-600 font-semibold mb-3">
                  Refund Amount: ₹{request.refundAmount}
                </p>
              )}
              
              {request.adminNotes && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Admin Notes:</p>
                  <p className="text-sm text-gray-700">{request.adminNotes}</p>
                </div>
              )}
              
              <small className="text-gray-500">
                Requested on {new Date(request.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenantLeaveRequests;