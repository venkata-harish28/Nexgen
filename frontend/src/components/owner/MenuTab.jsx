import React, { useState } from 'react';
import { Utensils, Edit, Coffee, Sun, Cookie, Moon, Plus, X, Calendar } from 'lucide-react';
import { ownerAPI } from '../../services/api';

const MenuTab = ({ data, token, selectedLocation, onUpdate }) => {
  const [editingDay, setEditingDay] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    location: selectedLocation === 'all' ? 'Gachibowli' : selectedLocation,
    day: 'Monday',
    breakfast: '',
    lunch: '',
    snacks: '',
    dinner: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const locations = ['Gachibowli', 'Gowlidobbi', 'Pocharam', 'Madhapur'];

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
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ownerAPI.saveMenu(token, formData);
      setEditingDay(null);
      setShowForm(false);
      setFormData({
        location: selectedLocation === 'all' ? 'Gachibowli' : selectedLocation,
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

  // Sort menu by location first, then by day
  const sortedMenu = [...data].sort((a, b) => {
    const locationComparison = locations.indexOf(a.location) - locations.indexOf(b.location);
    if (locationComparison !== 0) {
      return locationComparison;
    }
    return days.indexOf(a.day) - days.indexOf(b.day);
  });

  const getMealConfig = (meal) => {
    const configs = {
      breakfast: { 
        icon: Coffee, 
        bg: 'bg-blue-50',
        text: 'text-blue-700'
      },
      lunch: { 
        icon: Sun, 
        bg: 'bg-blue-50',
        text: 'text-blue-700'
      },
      snacks: { 
        icon: Cookie, 
        bg: 'bg-blue-50',
        text: 'text-blue-700'
      },
      dinner: { 
        icon: Moon, 
        bg: 'bg-blue-50',
        text: 'text-blue-700'
      }
    };
    return configs[meal] || configs.breakfast;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Utensils size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Weekly Menu</h3>
              <p className="text-sm text-gray-600">Manage meal plans for your locations</p>
            </div>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold shadow-sm"
          >
            {showForm ? 'Cancel' : '+ Add Menu'}
          </button>
        </div>
      </div>

      {/* Menu Form - Inline */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-8 border-2 border-green-200">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-2xl font-bold text-gray-900">
              {editingDay ? `Edit ${editingDay}'s Menu` : 'Create New Menu'}
            </h4>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingDay(null);
                setFormData({
                  location: selectedLocation === 'all' ? 'Gachibowli' : selectedLocation,
                  day: 'Monday',
                  breakfast: '',
                  lunch: '',
                  snacks: '',
                  dinner: ''
                });
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Gachibowli">Gachibowli</option>
                  <option value="Gowlidobbi">Gowlidobbi</option>
                  <option value="Pocharam">Pocharam</option>
                  <option value="Madhapur">Madhapur</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Day of Week <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'breakfast', label: 'Breakfast', icon: Coffee, placeholder: 'Idli, Sambar, Chutney, Coffee' },
                { key: 'lunch', label: 'Lunch', icon: Sun, placeholder: 'Rice, Dal, Chapati, Curry, Curd' },
                { key: 'snacks', label: 'Snacks', icon: Cookie, placeholder: 'Samosa, Tea, Biscuits' },
                { key: 'dinner', label: 'Dinner', icon: Moon, placeholder: 'Chapati, Rice, Dal, Vegetables' }
              ].map(({ key, label, icon: Icon, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Icon size={16} className="text-blue-600" />
                    {label}
                  </label>
                  <input
                    type="text"
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex gap-4">
              <button 
                type="submit" 
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold shadow-md"
              >
                {editingDay ? 'Update Menu' : 'Save Menu'}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setShowForm(false);
                  setEditingDay(null);
                  setFormData({
                    location: selectedLocation === 'all' ? 'Gachibowli' : selectedLocation,
                    day: 'Monday',
                    breakfast: '',
                    lunch: '',
                    snacks: '',
                    dinner: ''
                  });
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Menu Display */}
      {sortedMenu.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center border border-gray-200">
          <Utensils size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Menu Available</h3>
          <p className="text-gray-600">Create your first weekly menu to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {sortedMenu.map((menu) => (
            <div 
              key={menu._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border-2 border-green-200"
            >
              {/* Card Header - BLUE */}
              <div className="bg-blue-600 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white/20 rounded">
                      <Calendar size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{menu.day}</h4>
                      <p className="text-xs text-white/90 font-medium">{menu.location}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleEdit(menu)}
                    className="p-1.5 bg-white/20 hover:bg-white/30 rounded transition-all duration-200"
                  >
                    <Edit size={14} className="text-white" />
                  </button>
                </div>
              </div>
              
              {/* Meals */}
              <div className="p-3 space-y-2">
                {menu.breakfast && (
                  <MealSection
                    title="Breakfast"
                    items={menu.breakfast}
                    config={getMealConfig('breakfast')}
                  />
                )}
                
                {menu.lunch && (
                  <MealSection
                    title="Lunch"
                    items={menu.lunch}
                    config={getMealConfig('lunch')}
                  />
                )}
                
                {menu.snacks && (
                  <MealSection
                    title="Snacks"
                    items={menu.snacks}
                    config={getMealConfig('snacks')}
                  />
                )}
                
                {menu.dinner && (
                  <MealSection
                    title="Dinner"
                    items={menu.dinner}
                    config={getMealConfig('dinner')}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MealSection = ({ title, items, config }) => {
  const Icon = config.icon;
  const itemList = items.split(',').map(item => item.trim()).filter(Boolean);
  
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={12} className={config.text} />
        <p className={`text-xs font-bold ${config.text}`}>{title}</p>
      </div>
      
      <div className={`${config.bg} rounded-lg p-2 border border-blue-200`}>
        {itemList.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {itemList.map((item, index) => (
              <span 
                key={index}
                className="px-1.5 py-0.5 bg-white rounded text-gray-700 font-medium text-xs border border-gray-200"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-xs">{items}</p>
        )}
      </div>
    </div>
  );
};

export default MenuTab;