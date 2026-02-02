import React, { useState } from 'react';
import { Home, X, Users, IndianRupee, Layers, Building2 } from 'lucide-react';
import { BedSingle } from "lucide-react";

const TenantRooms = ({ data }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
          <Building2 size={28} className="text-blue-600" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Available Rooms</h3>
          <p className="text-gray-600 mt-1">Browse available rooms at your location</p>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <Home size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Vacant Rooms</h3>
          <p className="text-gray-600">There are no vacant rooms available at this time. Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(room => {
            const availableBeds = room.capacity - room.currentOccupancy;
            const occupancyPercentage = (room.currentOccupancy / room.capacity) * 100;
            
            return (
              <div 
                key={room._id} 
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200 border border-gray-100"
              >
                {/* Room Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Room {room.roomNumber}</h4>
                    <p className="text-sm text-gray-500">Floor {room.floor}</p>
                  </div>
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                    {availableBeds} {availableBeds === 1 ? 'Bed' : 'Beds'} Available
                  </span>
                </div>
                
                {/* Room Info Grid */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-semibold text-gray-900 ml-auto">{room.capacity} persons</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <Layers size={16} className="text-gray-400" />
                    <span className="text-gray-600">Occupancy:</span>
                    <span className="font-semibold text-gray-900 ml-auto">{room.currentOccupancy}/{room.capacity}</span>
                  </div>

                  {/* Occupancy Progress Bar */}
                  <div className="pt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          occupancyPercentage < 50 
                            ? 'bg-green-500' 
                            : occupancyPercentage < 75 
                            ? 'bg-yellow-500' 
                            : 'bg-orange-500'
                        }`}
                        style={{ width: `${occupancyPercentage}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Rent Amount */}
                  <div className="pt-3 border-t border-gray-200 flex items-center gap-2">
                    <IndianRupee size={18} className="text-gray-700" />
                    <span className="text-2xl font-bold text-gray-900">
                      {room.rentAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-gray-600">/month</span>
                  </div>
                </div>
                
                {/* Amenities */}
                {room.amenities && room.amenities.length > 0 && (
                  <div className="pt-4 border-t border-gray-200 mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => setSelectedRoom(room)}
                  className="w-full mt-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  View Room Layout
                </button>
              </div>
            );
          })}
        </div>
      )}

      {selectedRoom && (
        <RoomLayoutModal 
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onViewPhoto={() => setShowPhotoModal(true)}
        />
      )}

      {showPhotoModal && selectedRoom && (
        <RoomPhotoModal
          room={selectedRoom}
          onClose={() => setShowPhotoModal(false)}
        />
      )}
    </div>
  );
};

const RoomLayoutModal = ({ room, onClose, onViewPhoto }) => {
  // Generate bed layout based on capacity
  const generateBedLayout = (capacity, currentOccupancy) => {
    const beds = [];
    const bedsPerRow = capacity <= 4 ? capacity : Math.ceil(capacity / 2); // Arrange in max 2 rows
    const rows = Math.ceil(capacity / bedsPerRow);

    for (let bedNumber = 1; bedNumber <= capacity; bedNumber++) {
      const row = Math.floor((bedNumber - 1) / bedsPerRow);
      const col = (bedNumber - 1) % bedsPerRow;
      const isOccupied = bedNumber <= currentOccupancy;
      
      beds.push({
        id: bedNumber,
        row,
        col,
        occupied: isOccupied,
        available: !isOccupied
      });
    }
    return beds;
  };

  const beds = generateBedLayout(room.capacity, room.currentOccupancy);
  const bedsPerRow = room.capacity <= 4 ? room.capacity : Math.ceil(room.capacity / 2);
  const rows = Math.ceil(room.capacity / bedsPerRow);
  const availableBeds = beds.filter(bed => !bed.occupied).length;

  const handleBedClick = (bed) => {
    if (bed.available) {
      // Show photo for available beds
      onViewPhoto();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-5 flex justify-between items-center rounded-t-2xl shadow-lg z-10">
          <div>
            <h3 className="text-2xl font-bold">Room {room.roomNumber} - Layout</h3>
            <p className="text-blue-100 text-sm mt-1">Floor {room.floor} • {availableBeds} bed(s) available</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-600 font-medium mb-1">Total Beds</p>
              <p className="text-2xl font-bold text-blue-900">{room.capacity}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <p className="text-sm text-red-600 font-medium mb-1">Occupied</p>
              <p className="text-2xl font-bold text-red-900">{room.currentOccupancy}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-600 font-medium mb-1">Available</p>
              <p className="text-2xl font-bold text-green-900">{availableBeds}</p>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <BedSingle size={24} className="text-green-500" strokeWidth={2.5} />
              <span className="text-sm font-medium text-gray-700">Available (Click to view)</span>
            </div>
            <div className="flex items-center gap-2">
              <BedSingle size={24} className="text-red-500" strokeWidth={2.5} />
              <span className="text-sm font-medium text-gray-700">Occupied</span>
            </div>
          </div>

          {/* Room Layout Title */}
          <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">Bed Arrangement</h4>

          {/* Room Layout - Bed Grid */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-xl border-2 border-gray-200">
            <div className="flex flex-col items-center gap-8">
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-10 justify-center items-center">
                  {beds
                    .filter(bed => bed.row === rowIndex)
                    .map(bed => (
                      <div 
                        key={bed.id}
                        className="relative group"
                      >
                        <button
                          onClick={() => handleBedClick(bed)}
                          disabled={bed.occupied}
                          className={`
                            transition-all duration-300 transform
                            ${bed.occupied 
                              ? 'cursor-not-allowed opacity-75' 
                              : 'hover:scale-110 cursor-pointer hover:drop-shadow-xl'
                            }
                          `}
                          title={bed.occupied ? 'Occupied' : 'Available - Click to view room photo'}
                        >
                          <BedSingle 
                            size={90} 
                            strokeWidth={2.5}
                            className={`
                              ${bed.occupied ? 'text-red-500' : 'text-green-500'}
                              transition-all duration-300
                            `} 
                          />
                          
                          {/* Bed Number Badge */}
                          <div className={`
                            absolute -top-2 -right-2 w-7 h-7 rounded-full 
                            flex items-center justify-center text-xs font-bold text-white
                            ${bed.occupied ? 'bg-red-600' : 'bg-green-600'}
                            shadow-md
                          `}>
                            {bed.id}
                          </div>
                        </button>

                        {/* Tooltip */}
                        {!bed.occupied && (
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-md whitespace-nowrap">
                              Click to view photo
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">💡 Tip:</span> Click on any available (green) bed to view the room photo and get more details.
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Close Layout View
          </button>
        </div>
      </div>
    </div>
  );
};

const RoomPhotoModal = ({ room, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[60] backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-xl font-bold">Room {room.roomNumber} - Photo Gallery</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {room.photos && room.photos.length > 0 ? (
            <div className="space-y-4">
              <img 
                src={room.photos[0]} 
                alt={`Room ${room.roomNumber}`}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              {room.photos.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {room.photos.slice(1).map((photo, index) => (
                    <img 
                      key={index}
                      src={photo} 
                      alt={`Room ${room.roomNumber} - ${index + 2}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-96 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Home size={64} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 text-lg font-medium">No photo available for this room</p>
                <p className="text-gray-500 text-sm mt-2">Contact the hostel management for more details</p>
              </div>
            </div>
          )}
          
          <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Room Number:</p>
                <p className="font-semibold text-gray-900">{room.roomNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Floor:</p>
                <p className="font-semibold text-gray-900">{room.floor}</p>
              </div>
              <div>
                <p className="text-gray-600">Capacity:</p>
                <p className="font-semibold text-gray-900">{room.capacity} persons</p>
              </div>
              <div>
                <p className="text-gray-600">Monthly Rent:</p>
                <p className="font-semibold text-gray-900">₹{room.rentAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-full mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Close Photo Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantRooms;