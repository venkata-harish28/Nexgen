import React, { useState } from 'react';
import { Home, X, Users, IndianRupee, Layers, Building2 } from 'lucide-react';
import { BedSingle } from "lucide-react";

const TenantRooms = ({ data }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const getRoomPhoto = (capacity) => {
    const photoMap = {
      1: '/1share.png',
      2: '/2share.png',
      3: '/3share.jpeg',
      4: '/4share.png',
      5: '/5share.png'
    };
    return photoMap[capacity] || '/4share.png';
  };

  return (
    <div>
      <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
        <div className="p-2 sm:p-3 bg-blue-50 rounded-xl border border-blue-100">
          <Building2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 text-blue-600" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Available Rooms</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-0.5 sm:mt-1">Browse available rooms at your location</p>
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 md:p-16 text-center">
          <Home className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-30 text-gray-400" />
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-gray-900">No Vacant Rooms</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">There are no vacant rooms available at this time. Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data.map(room => {
            const availableBeds = room.capacity - room.currentOccupancy;
            const occupancyPercentage = (room.currentOccupancy / room.capacity) * 100;
            const roomPhoto = getRoomPhoto(room.capacity);
            
            return (
              <div 
                key={room._id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden"
              >
                {/* Room Image */}
                <div style={{
                  height: '180px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
                className="sm:h-[200px]"
                >
                  <img
                    src={roomPhoto}
                    alt={`${room.capacity} Share Room`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    background: 'rgba(34, 197, 94, 0.95)',
                    color: 'white',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                  className="sm:text-sm sm:px-4 sm:py-2"
                  >
                    {room.capacity} Share
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '0.75rem',
                    background: 'rgba(255,255,255,0.95)',
                    color: '#22c55e',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                  className="sm:text-sm sm:px-4 sm:py-2"
                  >
                    {availableBeds} {availableBeds === 1 ? 'Bed' : 'Beds'} Available
                  </div>
                </div>

                {/* Room Content */}
                <div className="p-4 sm:p-6">
                  {/* Room Header */}
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900">Room {room.roomNumber}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">Floor {room.floor}</p>
                    </div>
                  </div>
                  
                  {/* Room Info Grid */}
                  <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-semibold text-gray-900 ml-auto">{room.capacity} persons</span>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                      <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
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
                    <div className="pt-2 sm:pt-3 border-t border-gray-200 flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">
                        {room.rentAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600">/month</span>
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  {room.amenities && room.amenities.length > 0 && (
                    <div className="pt-3 sm:pt-4 border-t border-gray-200 mb-3 sm:mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Amenities:</p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {room.amenities.map((amenity, index) => (
                          <span 
                            key={index} 
                            className="text-xs px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200"
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
                    className="w-full mt-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                  >
                    View Room Layout
                  </button>
                </div>
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
          roomPhoto={getRoomPhoto(selectedRoom.capacity)}
        />
      )}

      {showPhotoModal && selectedRoom && (
        <RoomPhotoModal
          room={selectedRoom}
          onClose={() => setShowPhotoModal(false)}
          roomPhoto={getRoomPhoto(selectedRoom.capacity)}
        />
      )}
    </div>
  );
};

const RoomLayoutModal = ({ room, onClose, onViewPhoto, roomPhoto }) => {
  const generateBedLayout = (capacity, currentOccupancy) => {
    const beds = [];
    const bedsPerRow = capacity <= 4 ? capacity : Math.ceil(capacity / 2);
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
      onViewPhoto();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 sm:p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center rounded-t-xl md:rounded-t-2xl shadow-lg z-10">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Room {room.roomNumber} - Layout</h3>
            <p className="text-blue-100 text-xs sm:text-sm mt-1">Floor {room.floor} • {availableBeds} bed(s) available</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <div className="bg-blue-50 rounded-lg p-2.5 sm:p-4 border border-blue-200">
              <p className="text-xs sm:text-sm text-blue-600 font-medium mb-1">Total Beds</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-900">{room.capacity}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-2.5 sm:p-4 border border-red-200">
              <p className="text-xs sm:text-sm text-red-600 font-medium mb-1">Occupied</p>
              <p className="text-xl sm:text-2xl font-bold text-red-900">{room.currentOccupancy}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-2.5 sm:p-4 border border-green-200">
              <p className="text-xs sm:text-sm text-green-600 font-medium mb-1">Available</p>
              <p className="text-xl sm:text-2xl font-bold text-green-900">{availableBeds}</p>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <BedSingle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" strokeWidth={2.5} />
              <span className="text-xs sm:text-sm font-medium text-gray-700">Available (Click to view)</span>
            </div>
            <div className="flex items-center gap-2">
              <BedSingle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" strokeWidth={2.5} />
              <span className="text-xs sm:text-sm font-medium text-gray-700">Occupied</span>
            </div>
          </div>

          {/* Room Layout Title */}
          <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Bed Arrangement</h4>

          {/* Room Layout - Bed Grid */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 md:p-10 rounded-xl border-2 border-gray-200">
            <div className="flex flex-col items-center gap-6 sm:gap-8">
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-6 sm:gap-8 md:gap-10 justify-center items-center flex-wrap">
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
                            className={`
                              w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                              ${bed.occupied ? 'text-red-500' : 'text-green-500'}
                              transition-all duration-300
                            `}
                            strokeWidth={2.5}
                          />
                          
                          {/* Bed Number Badge */}
                          <div className={`
                            absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full 
                            flex items-center justify-center text-xs font-bold text-white
                            ${bed.occupied ? 'bg-red-600' : 'bg-green-600'}
                            shadow-md
                          `}>
                            {bed.id}
                          </div>
                        </button>

                        {/* Tooltip */}
                        {!bed.occupied && (
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
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
          <div className="mt-4 sm:mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-blue-800">
              <span className="font-semibold">💡 Tip:</span> Click on any available (green) bed to view the room photo and get more details.
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Close Layout View
          </button>
        </div>
      </div>
    </div>
  );
};

const RoomPhotoModal = ({ room, onClose, roomPhoto }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-3 sm:p-4 z-[60] backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-4xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center rounded-t-xl md:rounded-t-2xl relative">
          <h3 className="text-base sm:text-lg md:text-xl font-bold">Room {room.roomNumber} - Photo Gallery</h3>
          <button 
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 bg-white/10 z-20"
            aria-label="Close photo modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
          </button>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            <img 
              src={roomPhoto} 
              alt={`Room ${room.roomNumber} - ${room.capacity} Share`}
              className="w-full h-auto rounded-lg shadow-lg"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
          
          <div className="mt-4 sm:mt-6 bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <p className="text-gray-600">Room Number:</p>
                <p className="font-semibold text-gray-900">{room.roomNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Floor:</p>
                <p className="font-semibold text-gray-900">{room.floor}</p>
              </div>
              <div>
                <p className="text-gray-600">Sharing Type:</p>
                <p className="font-semibold text-gray-900">{room.capacity} Share Room</p>
              </div>
              <div>
                <p className="text-gray-600">Monthly Rent:</p>
                <p className="font-semibold text-gray-900">₹{room.rentAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {room.amenities && room.amenities.length > 0 && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                <p className="text-gray-600 mb-2 text-xs sm:text-sm">Amenities:</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {room.amenities.map((amenity, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Close Photo Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantRooms;