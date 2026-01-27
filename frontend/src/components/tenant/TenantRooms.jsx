import React, { useState } from 'react';
import { Home, X } from 'lucide-react';
import { BedSingle } from "lucide-react";


const TenantRooms = ({ data }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Available Rooms</h3>
      
      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <Home size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No Vacant Rooms</h3>
          <p className="text-gray-600">There are no vacant rooms available at this time</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(room => (
            <div key={room._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-gray-900">Room {room.roomNumber}</h4>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  Available
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Floor:</span> {room.floor}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Capacity:</span> {room.capacity} persons
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Current Occupancy:</span> {room.currentOccupancy}/{room.capacity}
                </p>
                <p className="text-lg font-bold text-gray-900 mt-3">
                  ₹{room.rentAmount}/month
                </p>
              </div>
              
              {room.amenities && room.amenities.length > 0 && (
                <div className="pt-4 border-t border-gray-200 mb-4">
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

              <button
                onClick={() => setSelectedRoom(room)}
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                View Layout
              </button>
            </div>
          ))}
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
  const generateBedLayout = (capacity) => {
    const beds = [];
    const bedsPerRow = Math.min(capacity, 4); // Max 4 beds per row for better spacing
    const rows = Math.ceil(capacity / bedsPerRow);

    for (let row = 0; row < rows; row++) {
      const bedsInThisRow = Math.min(bedsPerRow, capacity - row * bedsPerRow);
      for (let col = 0; col < bedsInThisRow; col++) {
        const bedNumber = row * bedsPerRow + col + 1;
        const isOccupied = bedNumber <= room.currentOccupancy;
        beds.push({
          id: bedNumber,
          row,
          col,
          occupied: isOccupied,
          available: !isOccupied
        });
      }
    }
    return beds;
  };

  const beds = generateBedLayout(room.capacity);
  const bedsPerRow = Math.min(room.capacity, 4);

  const handleBedClick = (bed) => {
    if (!bed.occupied) {
      // Only vacant beds can be clicked to view photo
      onViewPhoto();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <div>
            <h3 className="text-2xl font-bold">Room {room.roomNumber}</h3>
            <p className="text-blue-100 text-sm">Floor {room.floor}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Bed Status Title */}
          <h4 className="text-2xl font-bold text-gray-800 mb-6">Bed Status</h4>

          {/* Room Layout - Only Bed Icons */}
          <div className="bg-white p-8 rounded-xl">
            <div className="flex flex-col items-center gap-6">
              {Array.from({ length: Math.ceil(room.capacity / bedsPerRow) }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-8 justify-center">
                  {beds
                    .filter(bed => bed.row === rowIndex)
                    .map(bed => (
                      <button
                        key={bed.id}
                        onClick={() => handleBedClick(bed)}
                        className={`
                          transition-all duration-200
                          ${bed.occupied 
                            ? 'cursor-not-allowed' 
                            : 'hover:scale-110 cursor-pointer'
                          }
                        `}
                        title={bed.occupied ? 'Occupied' : 'Click to view room photo'}
                      >
                        <BedSingle 
                          size={80} 
                          strokeWidth={2.5}
                          className={bed.occupied ? 'text-red-500' : 'text-green-500'} 
                        />
                      </button>
                    ))}
                </div>
              ))}
            </div>
          </div>

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
        <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-xl font-bold">Room {room.roomNumber} - Photo</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {room.photos && room.photos.length > 0 ? (
            <img 
              src={room.photos[0]} 
              alt={`Room ${room.roomNumber}`}
              className="w-full h-auto rounded-lg"
            />
          ) : (
            <div className="bg-gray-100 h-96 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <Home size={64} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">No photo available for this room</p>
              </div>
            </div>
          )}
          
          <button
            onClick={onClose}
            className="w-full mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantRooms;