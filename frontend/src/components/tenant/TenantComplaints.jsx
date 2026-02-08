import React, { useState } from 'react';
import { FileText, Folder, X, MessageSquare, History } from 'lucide-react';
import { tenantAPI } from '../../services/api';

const TenantComplaints = ({ data, passkey, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'other',
    priority: 'medium'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await tenantAPI.submitComplaint(passkey, formData);
      setShowForm(false);
      setFormData({ subject: '', description: '', category: 'other', priority: 'medium' });
      onUpdate();
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit complaint. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-orange-400 text-white';
      case 'low': return 'bg-cyan-400 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getCardBackground = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': return 'bg-orange-50';
      case 'medium': return 'bg-orange-50';
      case 'low': return 'bg-cyan-50';
      default: return 'bg-gray-50';
    }
  };

  const getTextColor = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': return 'text-orange-700';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-cyan-700';
      default: return 'text-gray-700';
    }
  };

  const sortComplaints = (complaints) => {
    return [...complaints].sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityA = priorityOrder[a.priority?.toLowerCase()] ?? 3;
      const priorityB = priorityOrder[b.priority?.toLowerCase()] ?? 3;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const activeComplaints = sortComplaints(data.filter(c => c.status !== 'resolved' && c.status !== 'closed'));
  const resolvedComplaints = sortComplaints(data.filter(c => c.status === 'resolved' || c.status === 'closed'));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-blue-50 rounded-xl border border-blue-100">
              <Folder className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 text-indigo-700" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-900">My Complaints</h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-0.5 sm:mt-1 hidden sm:block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'active'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MessageSquare size={18} className="sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Active ({activeComplaints.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'history'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <History size={18} className="sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Resolved ({resolvedComplaints.length})</span>
          </button>
          <button 
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold shadow-lg text-sm sm:text-base"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ New Complaint'}
          </button>
        </div>

        {/* Complaint Form */}
        {showForm && (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 border-2 border-indigo-100">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-900">Submit New Complaint</h4>
              <button 
                onClick={() => setShowForm(false)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Category */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    <option value="maintenance">Maintenance</option>
                    <option value="cleanliness">Cleanliness</option>
                    <option value="food">Food</option>
                    <option value="noise">Noise</option>
                    <option value="security">Security</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Priority Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              {/* Subject */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief description of the issue"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide detailed information about your complaint..."
                  rows="5"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button 
                  type="submit" 
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 font-semibold"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Complaint'}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Active Complaints */}
        {activeTab === 'active' && (
          <>
            {activeComplaints.length === 0 ? (
              <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-8 sm:p-12 md:p-16 text-center">
                <FileText className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 opacity-30 text-gray-400" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-gray-900">No Active Complaints</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {activeComplaints.map(complaint => (
                  <ComplaintCard 
                    key={complaint._id} 
                    complaint={complaint} 
                    getPriorityColor={getPriorityColor} 
                    getCardBackground={getCardBackground}
                    getTextColor={getTextColor}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Resolved Complaints */}
        {activeTab === 'history' && (
          <>
            {resolvedComplaints.length === 0 ? (
              <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-8 sm:p-12 md:p-16 text-center">
                <History className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 opacity-30 text-gray-400" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-gray-900">No Resolved Complaints</h3>
                <p className="text-sm sm:text-base text-gray-600">No complaints have been resolved yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {resolvedComplaints.map(complaint => (
                  <ComplaintCard 
                    key={complaint._id} 
                    complaint={complaint} 
                    getPriorityColor={getPriorityColor} 
                    getCardBackground={getCardBackground}
                    getTextColor={getTextColor}
                    isResolved={true} 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const ComplaintCard = ({ complaint, getPriorityColor, getCardBackground, getTextColor, isResolved = false }) => {
  return (
    <div 
      className={`${getCardBackground(complaint.priority)} rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 ${
        isResolved ? 'opacity-75' : ''
      }`}
    >
      {/* Priority Badge */}
      <div className="mb-3 sm:mb-4">
        <span className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold uppercase ${getPriorityColor(complaint.priority)}`}>
          {complaint.priority || 'Medium'}
        </span>
        {isResolved && (
          <span className="ml-2 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            ✓ {complaint.status}
          </span>
        )}
      </div>

      {/* Complaint Title */}
      <h3 className={`text-base sm:text-lg font-bold mb-2 ${getTextColor(complaint.priority)}`}>
        {complaint.subject}
      </h3>
      
      {/* Description */}
      <p className={`text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 ${getTextColor(complaint.priority)}`}>
        {complaint.description}
      </p>
      
      {/* Admin Response */}
      {complaint.adminResponse && (
        <div className="bg-white/80 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 border border-gray-200">
          <p className="text-xs font-semibold text-gray-700 mb-1">Admin Response:</p>
          <p className="text-xs sm:text-sm text-gray-600">{complaint.adminResponse}</p>
        </div>
      )}
      
      {/* Footer */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
        <span className="capitalize">{complaint.category}</span>
        <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default TenantComplaints;