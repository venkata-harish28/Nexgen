import React, { useState } from 'react';
import { Plus, Bell, Edit, Trash2 } from 'lucide-react';
import { ownerAPI } from '../../services/api';

const AnnouncementsTab = ({ data, token, selectedLocation, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
    priority: 'medium'
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
        location: selectedLocation === 'all' ? 'Location A' : selectedLocation, 
        priority: 'medium' 
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
      location: announcement.location,
      priority: announcement.priority
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

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Announcements</h3>
        <button 
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ 
              title: '', 
              content: '', 
              location: selectedLocation === 'all' ? 'Location A' : selectedLocation, 
              priority: 'medium' 
            });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          <Plus size={18} />
          <span>{showForm ? 'Cancel' : 'New Announcement'}</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h4 className="text-xl font-bold mb-6 text-gray-900">
            {editingId ? 'Edit Announcement' : 'Create Announcement'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="Location A">Location A</option>
                <option value="Location B">Location B</option>
                <option value="Location C">Location C</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter announcement title"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter announcement content"
                rows="4"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            
            <button 
              type="submit" 
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              {editingId ? 'Update' : 'Create'} Announcement
            </button>
          </form>
        </div>
      )}

      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <Bell size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Announcements</h3>
          <p className="text-gray-600">Create your first announcement</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.map(announcement => (
            <div key={announcement._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-bold mb-2 text-gray-900">{announcement.title}</h4>
                  <div className="flex gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      {announcement.location}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(announcement)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(announcement._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{announcement.content}</p>
              <small className="text-gray-500">
                Posted on {new Date(announcement.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsTab;