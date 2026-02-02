import React, { useState } from 'react';
import { Plus, Bell, Edit, Trash2, X, Calendar, MapPin } from 'lucide-react';
import { ownerAPI } from '../../services/api';

const AnnouncementsTab = ({ data, token, selectedLocation, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: selectedLocation === 'all' ? 'Location A' : selectedLocation
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await ownerAPI.updateAnnouncement(token, editingId, formData);
      } else {
        await ownerAPI.createAnnouncement(token, formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ 
        title: '', 
        content: '', 
        location: selectedLocation === 'all' ? 'Location A' : selectedLocation
      });
      onUpdate();
    } catch (error) {
      console.error('Error saving announcement:', error);
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      location: announcement.location
    });
    setEditingId(announcement._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await ownerAPI.deleteAnnouncement(token, id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting announcement:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
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

  // Sort announcements by date (newest first)
  const sortedData = [...data].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <Bell size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Announcements</h3>
              <p className="text-sm text-gray-600">Manage your hostel announcements</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ 
                title: '', 
                content: '', 
                location: selectedLocation === 'all' ? 'Location A' : selectedLocation
              });
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-md ${
              showForm 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
            }`}
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            <span>{showForm ? 'Cancel' : 'New Announcement'}</span>
          </button>
        </div>
      </div>

      {/* Announcement Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-8 border-2 border-blue-200">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-2xl font-bold text-gray-900">
              {editingId ? 'Edit Announcement' : 'Create New Announcement'}
            </h4>
            <button 
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
              >
                <option value="Location A">Location A</option>
                <option value="Location B">Location B</option>
                <option value="Location C">Location C</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter announcement title"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter announcement content"
                rows="6"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
              />
            </div>
            
            <div className="flex gap-4">
              <button 
                type="submit" 
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-md"
              >
                {editingId ? 'Update' : 'Create'} Announcement
              </button>
              <button 
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements Grid */}
      {sortedData.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center border border-gray-200">
          <Bell size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Announcements</h3>
          <p className="text-gray-600">Create your first announcement to notify tenants</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedData.map(announcement => {
            return (
              <div 
                key={announcement._id}
                className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
              >
                {/* Action Buttons - Top Right */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => handleEdit(announcement)}
                    className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(announcement._id)}
                    className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Bell Icon */}
                <div className="mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bell size={20} className="text-blue-600" />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-gray-900 mb-3 pr-16">
                  {announcement.title}
                </h4>

                {/* Content Preview */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {announcement.content}
                </p>

                {/* Meta Information */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold text-gray-900">{announcement.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-gray-600">Posted:</span>
                    <span className="font-semibold text-gray-900">{formatDate(announcement.createdAt)}</span>
                  </div>
                </div>

                {/* Footer - Time */}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    {formatTime(announcement.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Results Count */}
      {sortedData.length > 0 && (
        <div className="bg-white rounded-lg px-6 py-4 border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600 text-center">
            Total <span className="font-bold text-gray-900">{sortedData.length}</span> announcement{sortedData.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsTab;