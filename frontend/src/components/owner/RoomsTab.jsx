import React, { useState } from 'react';
import { Plus, Home, Edit2, Trash2, MapPin, Bed, TrendingUp, X, AlertCircle } from 'lucide-react';
import { ownerAPI } from '../../services/api';

const RoomsTab = ({ data, token, selectedLocation, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    location: selectedLocation === 'all' ? 'Gachibowli' : selectedLocation,
    capacity: 1,
    rentAmount: '',
    floor: 1,
    amenities: ''
  });

  const resetForm = () => {
    setFormData({
      roomNumber: '',
      location: selectedLocation === 'all' ? 'Gachibowli' : selectedLocation,
      capacity: 1,
      rentAmount: '',
      floor: 1,
      amenities: ''
    });
    setEditingRoom(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roomData = {
        ...formData,
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean)
      };
      
      if (editingRoom) {
        await ownerAPI.updateRoom(token, editingRoom._id, roomData);
      } else {
        await ownerAPI.createRoom(token, roomData);
      }
      
      setShowForm(false);
      resetForm();
      onUpdate();
    } catch (error) {
      console.error('Error saving room:', error);
      alert('Failed to save room. Please try again.');
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      roomNumber: room.roomNumber,
      location: room.location,
      capacity: room.capacity,
      rentAmount: room.rentAmount,
      floor: room.floor,
      amenities: room.amenities ? room.amenities.join(', ') : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await ownerAPI.deleteRoom(token, roomId);
        onUpdate();
      } catch (error) {
        console.error('Error deleting room:', error);
        alert('Failed to delete room. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  // Group rooms by location
  const roomsByLocation = data.reduce((acc, room) => {
    if (!acc[room.location]) {
      acc[room.location] = [];
    }
    acc[room.location].push(room);
    return acc;
  }, {});

  // Sort rooms within each location by room number
  Object.keys(roomsByLocation).forEach(location => {
    roomsByLocation[location].sort((a, b) => a.roomNumber.localeCompare(b.roomNumber));
  });

  const locations = Object.keys(roomsByLocation).sort();

  const getLocationColor = (index) => {
    const colors = [
      { bg: 'bg-blue-500', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'bg-blue-500' },
      { bg: 'bg-blue-500', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'bg-blue-500' },
      { bg: 'bg-teal-500', light: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', icon: 'bg-teal-500' }
    ];
    return colors[index % colors.length];
  };

  // Calculate location stats
  const getLocationStats = (rooms) => {
    const totalRooms = rooms.length;
    const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
    const totalOccupied = rooms.reduce((sum, r) => sum + r.currentOccupancy, 0);
    const vacantRooms = rooms.filter(r => r.isVacant).length;
    const avgOccupancy = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;
    
    return { totalRooms, totalCapacity, totalOccupied, vacantRooms, avgOccupancy };
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <Home size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Rooms</h3>
              <p className="text-sm text-gray-600">Manage all rooms across locations</p>
            </div>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold shadow-md"
          >
            {showForm ? 'Cancel' : '+ Add Room'}
          </button>
        </div>
      </div>

      {/* Add/Edit Room Form - Inline */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-8 border-2 border-indigo-200">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-2xl font-bold text-gray-900">
              {editingRoom ? 'Edit Room' : 'Add New Room'}
            </h4>
            <button 
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Room Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                  placeholder="e.g., 101, 202, A-101"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg "
                >
                  <option value="Gachibowli">Gachibowli</option>
                  <option value="Gowlidobbi">Gowlidobbi</option>
                  <option value="Pocharam">Pocharam</option>
                  <option value="Madhapur">Madhapur</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Capacity (Beds) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  placeholder="Number of beds"
                  min="1"
                  max="10"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Floor <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                  placeholder="Floor number"
                  min="0"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Rent (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.rentAmount}
                  onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
                  placeholder="Enter amount"
                  min="0"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amenities (comma-separated)
              </label>
              <input
                type="text"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                placeholder="e.g., WiFi, AC, Attached Bathroom, Study Table"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex gap-4">
              <button 
                type="submit" 
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold shadow-md"
              >
                {editingRoom ? 'Update' : 'Add'} Room
              </button>
              <button 
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center border border-gray-200">
          <Home size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Rooms Yet</h3>
          <p className="text-gray-600">Add your first room to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          {locations.map((location, locationIndex) => {
            const colorScheme = getLocationColor(locationIndex);
            const rooms = roomsByLocation[location];
            const stats = getLocationStats(rooms);
            
            return (
              <div key={location} className="space-y-4">
                {/* Location Header with Stats */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-3 px-5 py-2.5 ${colorScheme.bg} text-white rounded-lg shadow-md`}>
                        <MapPin size={20} />
                        <span className="font-bold text-base">{location}</span>
                      </div>
                      <div className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-sm rounded-lg border border-gray-200">
                        {stats.totalRooms} room{stats.totalRooms !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`${colorScheme.light} rounded-lg p-4 border-2 ${colorScheme.border}`}>
                      <p className="text-xs font-semibold text-gray-600 mb-1">Total Capacity</p>
                      <p className={`text-xl font-bold ${colorScheme.text}`}>{stats.totalCapacity} beds</p>
                    </div>
                    <div className={`${colorScheme.light} rounded-lg p-4 border-2 ${colorScheme.border}`}>
                      <p className="text-xs font-semibold text-gray-600 mb-1">Occupied</p>
                      <p className={`text-xl font-bold ${colorScheme.text}`}>{stats.totalOccupied} beds</p>
                    </div>
                    <div className={`${colorScheme.light} rounded-lg p-4 border-2 ${colorScheme.border}`}>
                      <p className="text-xs font-semibold text-gray-600 mb-1">Vacant Rooms</p>
                      <p className={`text-xl font-bold ${colorScheme.text}`}>{stats.vacantRooms}</p>
                    </div>
                    <div className={`${colorScheme.light} rounded-lg p-4 border-2 ${colorScheme.border}`}>
                      <p className="text-xs font-semibold text-gray-600 mb-1">Occupancy Rate</p>
                      <div className="flex items-center gap-2">
                        <p className={`text-xl font-bold ${colorScheme.text}`}>{stats.avgOccupancy}%</p>
                        <TrendingUp size={18} className={stats.avgOccupancy >= 70 ? 'text-emerald-600' : 'text-amber-600'} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {rooms.map(room => {
                    const occupancyPercentage = (room.currentOccupancy / room.capacity) * 100;
                    const isFullyOccupied = room.currentOccupancy >= room.capacity;
                    const availableBeds = room.capacity - room.currentOccupancy;
                    
                    return (
                      <div 
                        key={room._id} 
                        className={`${colorScheme.light} rounded-xl shadow-sm p-6 border-2 ${colorScheme.border} hover:shadow-lg transition-all duration-200`}
                      >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 ${colorScheme.icon} rounded-lg shadow-md`}>
                              <Home size={20} className="text-white" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-gray-900">Room {room.roomNumber}</h4>
                              <p className="text-sm font-semibold text-gray-600">Floor {room.floor}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                            room.isVacant 
                              ? 'bg-emerald-500 text-white' 
                              : isFullyOccupied
                              ? 'bg-red-500 text-white'
                              : 'bg-amber-500 text-white'
                          }`}>
                            {room.isVacant ? '✓ Vacant' : isFullyOccupied ? '✕ Full' : '◐ Partial'}
                          </span>
                        </div>
                        
                        {/* Room Details */}
                        <div className="space-y-3 mb-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-xs font-semibold text-gray-600 mb-1">Capacity</p>
                              <div className="flex items-center gap-2">
                                <Bed size={16} className="text-gray-600" />
                                <p className="text-base font-bold text-gray-900">{room.capacity} beds</p>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-xs font-semibold text-gray-600 mb-1">Available</p>
                              <p className="text-base font-bold text-gray-900">{availableBeds} bed{availableBeds !== 1 ? 's' : ''}</p>
                            </div>
                          </div>
                          
                          {/* Occupancy Bar */}
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-gray-600">Occupancy</span>
                              <span className="text-sm font-bold text-gray-900">
                                {room.currentOccupancy}/{room.capacity}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                              <div 
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                  occupancyPercentage === 0 
                                    ? 'bg-gray-400'
                                    : occupancyPercentage < 50 
                                    ? 'bg-emerald-500' 
                                    : occupancyPercentage < 100 
                                    ? 'bg-amber-500' 
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${occupancyPercentage}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-xs font-semibold text-gray-600 mb-1">Monthly Rent</p>
                            <p className="text-xl font-bold text-gray-900">
                              ₹{room.rentAmount.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                        
                        {/* Amenities */}
                        {room.amenities && room.amenities.length > 0 && (
                          <div className="bg-white rounded-lg p-3 mb-4 border border-gray-200">
                            <p className="text-xs font-semibold text-gray-600 mb-2">Amenities</p>
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.map((amenity, index) => (
                                <span 
                                  key={index} 
                                  className={`text-xs px-2.5 py-1 ${colorScheme.light} ${colorScheme.text} rounded-full font-semibold border ${colorScheme.border}`}
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => handleEdit(room)}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold shadow-sm"
                          >
                            <Edit2 size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(room._id)}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold shadow-sm"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RoomsTab;