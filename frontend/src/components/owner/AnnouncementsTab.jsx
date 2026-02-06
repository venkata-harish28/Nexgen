import React, { useState } from 'react';
import { Plus, Bell, Edit, Trash2, X, Calendar, MapPin } from 'lucide-react';
import { ownerAPI } from '../../services/api';

const AnnouncementsTab = ({ data = [], token, selectedLocation, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: selectedLocation === 'all' ? 'Gachibowli' : selectedLocation
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
        location: selectedLocation === 'all' ? 'Gachibowli' : selectedLocation
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

  const safeData = Array.isArray(data) ? data : [];
  const sortedData = [...safeData].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Section - Responsive */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <Bell size={20} className="sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Announcements</h3>
              <p className="text-xs sm:text-sm text-gray-600">Manage your hostel announcements</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ 
                title: '', 
                content: '', 
                location: selectedLocation === 'all' ? 'Gachibowli' : selectedLocation
              });
            }}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-md text-sm sm:text-base ${
              showForm 
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
            }`}
          >
            {showForm ? <X size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />}
            <span>{showForm ? 'Cancel' : 'New Announcement'}</span>
          </button>
        </div>
      </div>

      {/* Announcement Form - Responsive */}
      {showForm && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 border-2 border-blue-200">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
              {editingId ? 'Edit Announcement' : 'Create New Announcement'}
            </h4>
            <button 
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X size={20} className="sm:w-6 sm:h-6 text-gray-500" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-sm sm:text-base"
              >
                <option value="Gachibowli">Gachibowli</option>
                <option value="Gowlidobbi">Gowlidobbi</option>
                <option value="Pocharam">Pocharam</option>
                <option value="Madhapur">Madhapur</option>
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
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-sm sm:text-base"
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
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-sm sm:text-base resize-none"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                type="submit" 
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-md text-sm sm:text-base"
              >
                {editingId ? 'Update' : 'Create'} Announcement
              </button>
              <button 
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements Grid - Responsive */}
      {sortedData.length === 0 ? (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-12 sm:p-16 text-center border border-gray-200">
          <Bell size={40} className="sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-30 text-gray-400" />
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">No Announcements</h3>
          <p className="text-sm sm:text-base text-gray-600">Create your first announcement to notify tenants</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {sortedData.map(announcement => {
            return (
              <div 
                key={announcement._id}
                className="relative bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
              >
                {/* Action Buttons - Top Right */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2">
                  <button 
                    onClick={() => handleEdit(announcement)}
                    className="p-1.5 sm:p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    title="Edit"
                  >
                    <Edit size={14} className="sm:w-4 sm:h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(announcement._id)}
                    className="p-1.5 sm:p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    title="Delete"
                  >
                    <Trash2 size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Bell Icon */}
                <div className="mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bell size={16} className="sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 pr-12 sm:pr-16 line-clamp-2">
                  {announcement.title}
                </h4>

                {/* Content Preview */}
                <p className="text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                  {announcement.content}
                </p>

                {/* Meta Information */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <MapPin size={14} className="sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold text-gray-900 truncate">{announcement.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Calendar size={14} className="sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">Posted:</span>
                    <span className="font-semibold text-gray-900">{formatDate(announcement.createdAt)}</span>
                  </div>
                </div>

                {/* Footer - Time */}
                <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-gray-200">
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
        <div className="bg-white rounded-lg px-4 sm:px-6 py-3 sm:py-4 border border-gray-200 shadow-sm">
          <p className="text-xs sm:text-sm text-gray-600 text-center">
            Total <span className="font-bold text-gray-900">{sortedData.length}</span> announcement{sortedData.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsTab;