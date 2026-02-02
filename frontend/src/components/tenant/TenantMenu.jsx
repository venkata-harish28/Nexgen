import React, { useState } from 'react';
import { Utensils, Coffee, Sun, Cake, Moon, ChevronDown } from 'lucide-react';

const TenantMenu = ({ data }) => {
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const sortedMenu = [...data].sort((a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day));
  
  const [selectedDay, setSelectedDay] = useState(null);

  const getCurrentDay = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return today;
  };

  const currentDay = getCurrentDay();

  const getMealIcon = (mealType) => {
    switch(mealType) {
      case 'breakfast':
        return <Coffee size={20} className="text-blue-600" />;
      case 'lunch':
        return <Sun size={20} className="text-blue-600" />;
      case 'snacks':
        return <Cake size={20} className="text-blue-600" />;
      case 'dinner':
        return <Moon size={20} className="text-blue-600" />;
      default:
        return <Utensils size={20} className="text-blue-600" />;
    }
  };

  const getMealTime = (mealType) => {
    switch(mealType) {
      case 'breakfast':
        return '7:00 AM - 9:00 AM';
      case 'lunch':
        return '12:00 PM - 2:00 PM';
      case 'snacks':
        return '4:00 PM - 5:30 PM';
      case 'dinner':
        return '7:30 PM - 9:30 PM';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <Utensils size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Weekly Food Menu</h3>
              <p className="text-sm text-gray-600">Delicious meals planned for the week</p>
            </div>
          </div>
          
          {/* Current Day Indicator */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-lg shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wide">Today</p>
            <p className="text-lg font-bold">{currentDay}</p>
          </div>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center border border-gray-200">
          <Utensils size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Menu Available</h3>
          <p className="text-gray-600">The food menu hasn't been set yet. Please check back later.</p>
        </div>
      ) : (
        <>
          {/* Weekly Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedMenu.map(menu => {
              const isToday = menu.day === currentDay;
              const hasMeals = menu.breakfast || menu.lunch || menu.snacks || menu.dinner;
              
              return (
                <div 
                  key={menu._id} 
                  className={`relative rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-200 border-2 cursor-pointer ${
                    isToday 
                      ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-400 ring-2 ring-blue-400 ring-offset-2' 
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedDay(menu)}
                >
                  {/* Today Badge */}
                  {isToday && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      TODAY
                    </div>
                  )}

                  {/* Day Header */}
                  <div className="mb-4 pb-3 border-b-2 border-gray-200">
                    <h4 className={`text-xl font-bold ${isToday ? 'text-blue700' : 'text-gray-900'}`}>
                      {menu.day}
                    </h4>
                  </div>

                  {/* Meal Icons Summary */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {menu.breakfast && (
                      <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                        <Coffee size={14} className="text-blue-600" />
                        <span className="text-xs font-semibold text-blue-700">Breakfast</span>
                      </div>
                    )}
                    {menu.lunch && (
                      <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                        <Sun size={14} className="text-blue-600" />
                        <span className="text-xs font-semibold text-blue-700">Lunch</span>
                      </div>
                    )}
                    {menu.snacks && (
                      <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                        <Cake size={14} className="text-blue-600" />
                        <span className="text-xs font-semibold text-blue-700">Snacks</span>
                      </div>
                    )}
                    {menu.dinner && (
                      <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                        <Moon size={14} className="text-blue-600" />
                        <span className="text-xs font-semibold text-blue-700">Dinner</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Preview */}
                  {hasMeals && (
                    <div className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {menu.breakfast && <span>{menu.breakfast.substring(0, 30)}...</span>}
                      {!menu.breakfast && menu.lunch && <span>{menu.lunch.substring(0, 30)}...</span>}
                    </div>
                  )}

                  {/* View Details Button */}
                  <button 
                    className={`w-full mt-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      isToday
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    View Full Menu
                    <ChevronDown size={16} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Utensils size={24} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Meal Information</h4>
                <p className="text-sm text-blue-800 leading-relaxed">
                  All meals are freshly prepared daily. Special dietary requirements? Please contact the hostel management. 
                  Meal timings may vary on weekends and holidays.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Detailed Menu Modal - REDESIGNED */}
      {selectedDay && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={() => setSelectedDay(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header - Simplified */}
            <div className="sticky top-0 px-6 py-5 bg-white border-b-2 border-gray-200 rounded-t-2xl z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedDay.day}</h3>
                  {selectedDay.day === currentDay && (
                    <span className="inline-block mt-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      Today's Menu
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => setSelectedDay(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <span className="text-3xl text-gray-600">×</span>
                </button>
              </div>
            </div>

            {/* Modal Content - Clean Design */}
            <div className="p-6 space-y-4">
              {/* Breakfast */}
              {selectedDay.breakfast && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border-2 border-blue-300 shadow-sm">
                        {getMealIcon('breakfast')}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Breakfast</h4>
                        <p className="text-xs text-blue-600 font-medium">{getMealTime('breakfast')}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap pl-13">
                    {selectedDay.breakfast}
                  </p>
                </div>
              )}

              {/* Lunch */}
              {selectedDay.lunch && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border-2 border-blue-300 shadow-sm">
                        {getMealIcon('lunch')}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Lunch</h4>
                        <p className="text-xs text-blue-600 font-medium">{getMealTime('lunch')}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap pl-13">
                    {selectedDay.lunch}
                  </p>
                </div>
              )}

              {/* Snacks */}
              {selectedDay.snacks && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border-2 border-blue-300 shadow-sm">
                        {getMealIcon('snacks')}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Snacks</h4>
                        <p className="text-xs text-blue-600 font-medium">{getMealTime('snacks')}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap pl-13">
                    {selectedDay.snacks}
                  </p>
                </div>
              )}

              {/* Dinner */}
              {selectedDay.dinner && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border-2 border-blue-300 shadow-sm">
                        {getMealIcon('dinner')}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Dinner</h4>
                        <p className="text-xs text-blue-600 font-medium">{getMealTime('dinner')}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap pl-13">
                    {selectedDay.dinner}
                  </p>
                </div>
              )}

              {/* No Meals Message */}
              {!selectedDay.breakfast && !selectedDay.lunch && !selectedDay.snacks && !selectedDay.dinner && (
                <div className="text-center py-12">
                  <Utensils size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
                  <p className="text-gray-600">No meals scheduled for this day</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 p-6 bg-white border-t border-gray-200 rounded-b-2xl">
              <button 
                onClick={() => setSelectedDay(null)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantMenu;