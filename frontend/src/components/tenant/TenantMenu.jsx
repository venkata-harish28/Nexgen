import React from 'react';
import { Utensils } from 'lucide-react';

const TenantMenu = ({ data }) => {
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const sortedMenu = [...data].sort((a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day));

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Weekly Food Menu</h3>
      
      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <Utensils size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Menu Available</h3>
          <p className="text-gray-600">The food menu hasn't been set yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedMenu.map(menu => (
            <div key={menu._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <h4 className="text-xl font-bold mb-6 pb-4 border-b-2 border-gray-200 text-gray-900">
                {menu.day}
              </h4>
              
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenantMenu;