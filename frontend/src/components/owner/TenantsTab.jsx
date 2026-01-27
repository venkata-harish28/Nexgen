import React, { useState, useEffect } from 'react';
import { Plus, Users, X, Edit2, Trash2, Key } from 'lucide-react';
import { ownerAPI } from '../../services/api';

const TenantsTab = ({ data, token, selectedLocation, onUpdate, rooms }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomNumber: '',
    location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
    rentAmount: ''
  });
  const [newPasskey, setNewPasskey] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [error, setError] = useState('');

  // Get available rooms for the selected location
  useEffect(() => {
    if (showForm && rooms) {
      const filtered = rooms.filter(room => 
        room.location === formData.location && 
        room.currentOccupancy < room.capacity
      );
      setAvailableRooms(filtered);
    }
  }, [formData.location, showForm, rooms]);

  const handleRoomSelect = (e) => {
    const selectedRoom = availableRooms.find(room => room.roomNumber === e.target.value);
    if (selectedRoom) {
      setFormData({
        ...formData,
        roomNumber: selectedRoom.roomNumber,
        rentAmount: selectedRoom.rentAmount
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate room availability
    const selectedRoom = availableRooms.find(room => room.roomNumber === formData.roomNumber);
    if (!selectedRoom) {
      setError('Please select a valid room');
      return;
    }
    
    if (selectedRoom.currentOccupancy >= selectedRoom.capacity) {
      setError('Selected room is full. Please choose another room.');
      return;
    }

    try {
      const response = await ownerAPI.createTenant(token, formData);
      setNewPasskey(response.passkey || response.data?.passkey);
      onUpdate();
    } catch (error) {
      console.error('Error creating tenant:', error);
      setError(error.response?.data?.message || 'Failed to create tenant');
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setNewPasskey('');
    setError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      roomNumber: '',
      location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
      rentAmount: ''
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Tenants</h3>
          <p className="text-gray-600 mt-1">Total: {data.length} tenant{data.length !== 1 ? 's' : ''}</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          <Plus size={18} />
          <span>Add Tenant</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <Users size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Tenants</h3>
          <p className="text-gray-600">Add your first tenant to get started</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rent</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map(tenant => (
                  <tr key={tenant._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{tenant.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{tenant.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{tenant.phone}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{tenant.roomNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{tenant.location}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{tenant.rentAmount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(tenant.joinDate).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tenant.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {tenant.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-2xl font-bold">Add New Tenant</h3>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {newPasskey ? (
                <div>
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-800 font-semibold flex items-center gap-2">
                      ✓ Tenant created successfully!
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6 border-2 border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Key size={20} className="text-gray-700" />
                      <p className="font-semibold text-gray-900">Tenant Passkey</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-900 shadow-sm">
                      <p className="text-center font-mono text-3xl font-bold tracking-widest text-gray-900">
                        {newPasskey}
                      </p>
                    </div>
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-yellow-800 text-sm font-medium">
                        ⚠️ Important: Please save this passkey and provide it to the tenant. It cannot be recovered later.
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={closeModal}
                    className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter full name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone number"
                      required
                      pattern="[0-9]{10}"
                      title="Please enter a 10-digit phone number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value, roomNumber: '', rentAmount: '' })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                      <option value="Location A">Location A</option>
                      <option value="Location B">Location B</option>
                      <option value="Location C">Location C</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Room *
                    </label>
                    <select
                      value={formData.roomNumber}
                      onChange={handleRoomSelect}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                      <option value="">-- Select a room --</option>
                      {availableRooms.map(room => (
                        <option key={room._id} value={room.roomNumber}>
                          Room {room.roomNumber} - Floor {room.floor} - {room.capacity - room.currentOccupancy} bed(s) available - ₹{room.rentAmount.toLocaleString('en-IN')}/month
                        </option>
                      ))}
                    </select>
                    {availableRooms.length === 0 && (
                      <p className="text-sm text-red-600 mt-1">
                        No rooms available at this location. Please add rooms first.
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Rent *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={formData.rentAmount}
                        onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
                        placeholder="Rent amount"
                        required
                        readOnly
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Rent is set automatically based on the selected room</p>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button 
                      type="submit" 
                      disabled={availableRooms.length === 0}
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Create Tenant
                    </button>
                    <button 
                      type="button" 
                      onClick={closeModal}
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantsTab;