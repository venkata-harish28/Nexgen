import React, { useState } from 'react';
import { Home, X, Users, IndianRupee, Layers, Building2 } from 'lucide-react';
import { BedSingle } from 'lucide-react';
import Navbar from './NavBar';

const TenantRooms = ({ data = [] }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  return (
    <div>
      {/* ✅ NAVBAR SHOULD BE HERE (ONCE) */}
      <Navbar />

      <div className="mb-6 flex items-center gap-3 mt-6">
        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
          <Building2 size={28} className="text-blue-600" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Available Rooms</h3>
          <p className="text-gray-600 mt-1">
            Browse available rooms at your location
          </p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <Home size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            No Vacant Rooms
          </h3>
          <p className="text-gray-600">
            There are no vacant rooms available at this time. Please check back
            later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((room) => {
            const availableBeds = room.capacity - room.currentOccupancy;
            const occupancyPercentage =
              (room.currentOccupancy / room.capacity) * 100;

            return (
              <div
                key={room._id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200 border border-gray-100"
              >
                {/* Room Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      Room {room.roomNumber}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Floor {room.floor}
                    </p>
                  </div>
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                    {availableBeds}{' '}
                    {availableBeds === 1 ? 'Bed' : 'Beds'} Available
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-semibold text-gray-900 ml-auto">
                      {room.capacity} persons
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Layers size={16} className="text-gray-400" />
                    <span className="text-gray-600">Occupancy:</span>
                    <span className="font-semibold text-gray-900 ml-auto">
                      {room.currentOccupancy}/{room.capacity}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="pt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
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

                  {/* Rent */}
                  <div className="pt-3 border-t border-gray-200 flex items-center gap-2">
                    <IndianRupee size={18} />
                    <span className="text-2xl font-bold">
                      {room.rentAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-gray-600">/month</span>
                  </div>
                </div>

                {/* Amenities */}
                {room.amenities?.length > 0 && (
                  <div className="pt-4 border-t border-gray-200 mb-4">
                    <p className="text-xs font-semibold mb-2">Amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((a, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full border"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setSelectedRoom(room)}
                  className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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

/* ================= MODALS (UNCHANGED) ================= */

const RoomLayoutModal = ({ room, onClose, onViewPhoto }) => {
  const beds = Array.from({ length: room.capacity });

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full">
        <h3 className="text-xl font-bold mb-4">
          Room {room.roomNumber} Layout
        </h3>

        <div className="flex flex-wrap gap-6 justify-center">
          {beds.map((_, i) => (
            <BedSingle
              key={i}
              size={80}
              className={
                i < room.currentOccupancy
                  ? 'text-red-500'
                  : 'text-green-500 cursor-pointer'
              }
              onClick={() => i >= room.currentOccupancy && onViewPhoto()}
            />
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-gray-600 text-white py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const RoomPhotoModal = ({ room, onClose }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-60">
    <div className="bg-white rounded-xl p-6 max-w-3xl w-full">
      <h3 className="text-xl font-bold mb-4">
        Room {room.roomNumber} Photo
      </h3>

      {room.photos?.length ? (
        <img
          src={room.photos[0]}
          alt="Room"
          className="rounded-lg w-full"
        />
      ) : (
        <p className="text-center text-gray-500">No photo available</p>
      )}

      <button
        onClick={onClose}
        className="w-full mt-6 bg-gray-600 text-white py-2 rounded-lg"
      >
        Close
      </button>
    </div>
  </div>
);

export default TenantRooms;
