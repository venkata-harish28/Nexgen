import React, { useState } from 'react';
import { Utensils, Edit } from 'lucide-react';
import { ownerAPI } from '../../services/api';

const MenuTab = ({ data, token, selectedLocation, onUpdate }) => {
  const [editingDay, setEditingDay] = useState(null);
  const [formData, setFormData] = useState({
    location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
    day: 'Monday',
    breakfast: '',
    lunch: '',
    snacks: '',
    dinner: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleEdit = (menu) => {
    setFormData({
      location: menu.location,
      day: menu.day,
      breakfast: menu.breakfast,
      lunch: menu.lunch,
      snacks: menu.snacks,
      dinner: menu.dinner
    });
    setEditingDay(menu.day);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ownerAPI.saveMenu(token, formData);
      setEditingDay(null);
      setFormData({
        location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
        day: 'Monday',
        breakfast: '',
        lunch: '',
        snacks: '',
        dinner: ''
      });
      onUpdate();
    } catch (error) {
      console.error('Error saving menu:', error);
    }
  };

  const sortedMenu = [...data].sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day));

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Food Menu Management</h3>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h4 className="text-xl font-bold mb-6 text-gray-900">
          {editingDay ? `Edit Menu for ${editingDay}` : 'Add/Edit Menu'}
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Breakfast</label>
            <input
              type="text"
              value={formData.breakfast}
              onChange={(e) => setFormData({ ...formData, breakfast: e.target.value })}
              placeholder="Enter breakfast menu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lunch</label>
            <input
              type="text"
              value={formData.lunch}
              onChange={(e) => setFormData({ ...formData, lunch: e.target.value })}
              placeholder="Enter lunch menu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Snacks</label>
            <input
              type="text"
              value={formData.snacks}
              onChange={(e) => setFormData({ ...formData, snacks: e.target.value })}
              placeholder="Enter snacks menu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dinner</label>
            <input
              type="text"
              value={formData.dinner}
              onChange={(e) => setFormData({ ...formData, dinner: e.target.value })}
              placeholder="Enter dinner menu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-4">
            <button 
              type="submit" 
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              {editingDay ? 'Update' : 'Save'} Menu
            </button>
            {editingDay && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingDay(null);
                  setFormData({
                    location: selectedLocation === 'all' ? 'Location A' : selectedLocation,
                    day: 'Monday',
                    breakfast: '',
                    lunch: '',
                    snacks: '',
                    dinner: ''
                  });
                }}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {sortedMenu.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <Utensils size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Menu Set</h3>
          <p className="text-gray-600">Set up your first weekly menu</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedMenu.map(menu => (
            <div key={menu._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-center pb-4 mb-6 border-b-2 border-gray-200">
                <h4 className="text-xl font-bold text-gray-900">{menu.day}</h4>
                <button 
                  onClick={() => handleEdit(menu)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <Edit size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                {menu.breakfast && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Breakfast
                    </p>
                    <p className="text-gray-900">{menu.breakfast}</p>
                  </div>
                )}
                
                {menu.lunch && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Lunch
                    </p>
                    <p className="text-gray-900">{menu.lunch}</p>
                  </div>
                )}
                
                {menu.snacks && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Snacks
                    </p>
                    <p className="text-gray-900">{menu.snacks}</p>
                  </div>
                )}
                
                {menu.dinner && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Dinner
                    </p>
                    <p className="text-gray-900">{menu.dinner}</p>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-500 mt-6 pt-4 border-t border-gray-200">
                Location: {menu.location}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuTab;