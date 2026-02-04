import React, { useState, useEffect } from 'react';
import { Plus, Users, X, Trash2, Key, MapPin, Mail, Phone, Home, Calendar, IndianRupee, AlertCircle } from 'lucide-react';
import { ownerAPI } from '../../services/api';

const TenantsTab = ({ data, token, selectedLocation, onUpdate, rooms }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomNumber: '',
    location: selectedLocation === 'all' ? 'Gachibowli' : selectedLocation,
    rentAmount: ''
  });
  const [newPasskey, setNewPasskey] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (showForm && rooms) {
      const filtered = rooms.filter(room => 
        room.location === formData.location && 
        room.currentOccupancy < room.capacity
      );
      setAvailableRooms(filtered);
      
      if (formData.roomNumber) {
        const roomStillAvailable = filtered.find(r => r.roomNumber === formData.roomNumber);
        if (!roomStillAvailable) {
          setFormData(prev => ({ ...prev, roomNumber: '', rentAmount: '' }));
        }
      }
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

  const handleDelete = async (tenantId) => {
    if (window.confirm('Are you sure you want to delete this tenant? This action cannot be undone.')) {
      try {
        await ownerAPI.deleteTenant(token, tenantId);
        onUpdate();
      } catch (error) {
        console.error('Error deleting tenant:', error);
        alert(error.response?.data?.message || 'Failed to delete tenant. Please try again.');
      }
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setNewPasskey('');
    setError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      roomNumber: '',
      location: selectedLocation === 'all' ? 'Gachibowli' : selectedLocation,
      rentAmount: ''
    });
  };

  // Group tenants by location
  const tenantsByLocation = data.reduce((acc, tenant) => {
    if (!acc[tenant.location]) {
      acc[tenant.location] = [];
    }
    acc[tenant.location].push(tenant);
    return acc;
  }, {});

  // Sort tenants within each location by room number
  Object.keys(tenantsByLocation).forEach(location => {
    tenantsByLocation[location].sort((a, b) => a.roomNumber.localeCompare(b.roomNumber));
  });

  const locations = Object.keys(tenantsByLocation).sort();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Tenants</h3>
              <p className="text-sm text-gray-600">Total: {data.length} tenant{data.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-md"
          >
            {showForm ? 'Cancel' : '+ Add Tenant'}
          </button>
        </div>
      </div>

      {/* Add Tenant Form - Inline */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-8 border-2 border-blue-200">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-2xl font-bold text-gray-900">Add New Tenant</h4>
            <button 
              onClick={closeForm}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {newPasskey ? (
            <div>
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 mb-6">
                <p className="text-green-800 font-bold text-lg">
                  ✓ Tenant Created Successfully!
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6 border-2 border-gray-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Key size={20} className="text-white" />
                  </div>
                  <p className="font-bold text-gray-900 text-lg">Tenant Passkey</p>
                </div>
                <div className="bg-white p-6 rounded-xl border-2 border-dashed border-blue-600">
                  <p className="text-center font-mono text-3xl font-bold text-gray-900">
                    {newPasskey}
                  </p>
                </div>
                <div className="mt-4 bg-amber-50 border-2 border-amber-300 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle size={20} className="text-amber-700 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-800 text-sm font-semibold">
                    Save this passkey! Provide it to the tenant for login.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={closeForm}
                className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-semibold"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle size={20} className="text-red-700 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800 text-sm font-semibold">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter 10-digit phone number"
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value, roomNumber: '', rentAmount: '' })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Gachibowli">Gachibowli</option>
                  <option value="Gowlidobbi">Gowlidobbi</option>
                  <option value="Pocharam">Pocharam</option>
                  <option value="Madhapur">Madhapur</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Room <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.roomNumber}
                  onChange={handleRoomSelect}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- Select a room --</option>
                  {availableRooms.map(room => (
                    <option key={room._id} value={room.roomNumber}>
                      Room {room.roomNumber} - Floor {room.floor} - {room.capacity - room.currentOccupancy} bed(s) available - ₹{room.rentAmount.toLocaleString('en-IN')}/month
                    </option>
                  ))}
                </select>
                {availableRooms.length === 0 && (
                  <div className="mt-3 bg-red-50 border-2 border-red-200 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700 font-semibold">
                      No rooms available at this location.
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Rent <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-600 font-bold">₹</span>
                  <input
                    type="number"
                    value={formData.rentAmount}
                    readOnly
                    placeholder="Auto-filled based on room"
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 font-bold text-gray-900"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  type="submit" 
                  disabled={availableRooms.length === 0}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Tenant
                </button>
                <button 
                  type="button" 
                  onClick={closeForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center border border-gray-200">
          <Users size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Tenants Yet</h3>
          <p className="text-gray-600">Add your first tenant to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          {locations.map((location) => {
            const tenants = tenantsByLocation[location];
            
            return (
              <div key={location} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Location Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-gray-600" />
                    <span className="font-bold text-gray-900 text-lg">{location}</span>
                  </div>
                  <span className="px-4 py-1.5 bg-gray-200 text-gray-900 font-semibold text-sm rounded-lg">
                    {tenants.length} tenant{tenants.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Tenants Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Room</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Contact</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Rent</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Joined</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {tenants.map(tenant => (
                        <tr key={tenant._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Users size={16} className="text-gray-600" />
                              </div>
                              <span className="font-semibold text-gray-900 text-sm">{tenant.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <Home size={14} className="text-gray-400" />
                              <span className="font-bold text-gray-900 text-sm">{tenant.roomNumber}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <Mail size={12} className="text-gray-400" />
                                <span className="text-xs text-gray-600 truncate max-w-[200px]">{tenant.email}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Phone size={12} className="text-gray-400" />
                                <span className="text-xs text-gray-600">{tenant.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <IndianRupee size={14} className="text-gray-600" />
                              <span className="font-bold text-gray-900 text-sm">
                                {tenant.rentAmount.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={12} className="text-gray-400" />
                              <span className="text-xs text-gray-600">
                                {new Date(tenant.joinDate).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  year: 'numeric' 
                                })}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              tenant.isActive 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {tenant.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleDelete(tenant._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove tenant"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TenantsTab;