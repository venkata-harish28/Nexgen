import React, { useState } from 'react';
import { AlertCircle, X, Check } from 'lucide-react';
import { ownerAPI } from '../../services/api';

const ComplaintsTab = ({ data, token, onUpdate }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleUpdateStatus = async (id, status, adminResponse) => {
    try {
      await ownerAPI.updateComplaint(token, id, { status, adminResponse });
      setSelectedComplaint(null);
      onUpdate();
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Complaints Management</h3>
      
      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <AlertCircle size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Complaints</h3>
          <p className="text-gray-600">No complaints have been submitted</p>
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map(complaint => (
                  <tr key={complaint._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm text-gray-900">{complaint.tenantName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{complaint.roomNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{complaint.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 capitalize">{complaint.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{complaint.subject}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedComplaint(complaint)}
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

      {selectedComplaint && (
        <ComplaintModal 
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onUpdate={handleUpdateStatus}
        />
      )}
    </div>
  );
};

const ComplaintModal = ({ complaint, onClose, onUpdate }) => {
  const [status, setStatus] = useState(complaint.status);
  const [adminResponse, setAdminResponse] = useState(complaint.adminResponse || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(complaint._id, status, adminResponse);
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
          <h3 className="text-2xl font-bold text-gray-900">Complaint Details</h3>
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
              <span className="ml-2 text-gray-700">{complaint.tenantName}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Room:</span>
              <span className="ml-2 text-gray-700">{complaint.roomNumber} ({complaint.location})</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Category:</span>
              <span className="ml-2 text-gray-700 capitalize">{complaint.category}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Subject:</span>
              <span className="ml-2 text-gray-700">{complaint.subject}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 block mb-2">Description:</span>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{complaint.description}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Submitted:</span>
              <span className="ml-2 text-gray-700">{new Date(complaint.createdAt).toLocaleString()}</span>
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
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Response</label>
              <textarea
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                placeholder="Enter your response to the tenant"
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

export default ComplaintsTab;