import React, { useState } from 'react';
import { Plus, Home } from 'lucide-react';
import { ownerAPI } from '../../services/api';

const RoomsTab = ({ data, token, selectedLocation, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: '',
    location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
    capacity: 1,
    rentAmount: '',
    floor: 1,
    amenities: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roomData = {
        ...formData,
        amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean)
      };
      await ownerAPI.createRoom(token, roomData);
      setShowForm(false);
      setFormData({
        roomNumber: '',
        location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
        capacity: 1,
        rentAmount: '',
        floor: 1,
        amenities: ''
      });
      onUpdate();
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Rooms</h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          <Plus size={18} />
          <span>{showForm ? 'Cancel' : 'Add Room'}</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h4 className="text-xl font-bold mb-6 text-gray-900">Add New Room</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                <input
                  type="text"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                  placeholder="Enter room number"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  placeholder="Number of persons"
                  min="1"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
                <input
                  type="number"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                  placeholder="Floor number"
                  min="0"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent</label>
              <input
                type="number"
                value={formData.rentAmount}
                onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
                placeholder="Enter rent amount"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amenities (comma-separated)</label>
              <input
                type="text"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                placeholder="e.g., WiFi, AC, Attached Bathroom"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            
            <button 
              type="submit" 
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Add Room
            </button>
          </form>
        </div>
      )}

      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <Home size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Rooms</h3>
          <p className="text-gray-600">Add your first room</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(room => (
            <div key={room._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-gray-900">Room {room.roomNumber}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  room.isVacant ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {room.isVacant ? 'Vacant' : 'Occupied'}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Location:</span> {room.location}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Floor:</span> {room.floor}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Capacity:</span> {room.capacity} persons
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Occupancy:</span> {room.currentOccupancy}/{room.capacity}
                </p>
                <p className="text-lg font-bold text-gray-900 mt-3">
                  ₹{room.rentAmount}/month
                </p>
              </div>
              
              {room.amenities && room.amenities.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsTab;