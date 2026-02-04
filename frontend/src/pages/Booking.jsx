import React, { useState, useEffect } from 'react';
import { Home, X, Users, IndianRupee, Layers, Building2, Phone, Mail, AlertCircle } from 'lucide-react';
import { BedSingle } from 'lucide-react';
import Navbar from './NavBar';

// API base URL Configuration
const API_BASE_URL = 'http://localhost:5000';

// Mock data generator - Fallback if API is not available
const getMockRooms = () => {
  return [
    {
      _id: 'bhimavaram-1',
      roomNumber: '101',
      location: 'Bhimavaram',
      capacity: 1,
      currentOccupancy: 0,
      floor: 1,
      rentAmount: 25000,
      amenities: ['WiFi', 'AC', 'Attached Bathroom', 'Study Table', 'Wardrobe']
    },
    {
      _id: 'bhimavaram-2',
      roomNumber: '102',
      location: 'Bhimavaram',
      capacity: 2,
      currentOccupancy: 1,
      floor: 1,
      rentAmount: 15000,
      amenities: ['WiFi', 'AC', 'Study Table', 'Wardrobe']
    },
    {
      _id: 'bhimavaram-3',
      roomNumber: '201',
      location: 'Bhimavaram',
      capacity: 3,
      currentOccupancy: 1,
      floor: 2,
      rentAmount: 11000,
      amenities: ['WiFi', 'Fan', 'Study Table', 'Wardrobe']
    },
    {
      _id: 'bhimavaram-4',
      roomNumber: '202',
      location: 'Bhimavaram',
      capacity: 4,
      currentOccupancy: 2,
      floor: 2,
      rentAmount: 9000,
      amenities: ['WiFi', 'Fan', 'Common Bathroom']
    },
    {
      _id: 'bhimavaram-5',
      roomNumber: '301',
      location: 'Bhimavaram',
      capacity: 5,
      currentOccupancy: 2,
      floor: 3,
      rentAmount: 8000,
      amenities: ['WiFi', 'Fan', 'Common Bathroom']
    }
  ];
};

const fetchVacantRooms = async (location) => {
  try {
    console.log(`Fetching rooms for location: ${location}`);
    
    const response = await fetch(`${API_BASE_URL}/api/tenant/rooms/vacant?location=${encodeURIComponent(location)}`);
    
    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      console.log('API not available or returned error, using mock data');
      return getMockRooms();
    }
    
    const data = await response.json();
    console.log('Received data from API:', data);
    
    if (Array.isArray(data) && data.length > 0) {
      console.log(`Successfully fetched ${data.length} rooms from API`);
      return data;
    } else {
      console.log('API returned empty array, using mock data');
      return getMockRooms();
    }
  } catch (error) {
    console.log('Error fetching rooms from API, using mock data:', error);
    return getMockRooms();
  }
};

const Booking = () => {
  const [selectedLocation] = useState('Bhimavaram');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);

  // Owner contact details
  const ownerContact = {
    name: 'Property Manager',
    phone: '+91 98765 43210',
    email: 'contact@nextgenhostels.com'
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    setLoading(true);
    setError(null);
    setUsingMockData(false);
    
    try {
      const data = await fetchVacantRooms(selectedLocation);
      
      if (data.length > 0 && data[0]._id.includes('bhimavaram')) {
        setUsingMockData(true);
      }
      
      setRooms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading rooms:', error);
      setError('Failed to load rooms from server. Showing sample data.');
      setUsingMockData(true);
      setRooms(getMockRooms());
    } finally {
      setLoading(false);
    }
  };

  // Get room photo based on capacity
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
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />

      <div style={{ paddingTop: '100px', padding: '100px 2rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header Section */}
          <div className="mb-6 flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <Building2 size={28} className="text-blue-600" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Available Rooms - {selectedLocation}</h3>
              <p className="text-gray-600 mt-1">
                Browse available rooms and bed arrangements
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div style={{
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            padding: '2rem',
            borderRadius: '16px',
            marginBottom: '2rem',
            color: 'white',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
          }}>
            <h4 style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              marginBottom: '1.5rem'
            }}>
              Contact Property Manager
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>Manager</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{ownerContact.name}</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Phone size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>Phone</p>
                  <a 
                    href={`tel:${ownerContact.phone}`}
                    style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 600,
                      color: 'white',
                      textDecoration: 'none'
                    }}
                  >
                    {ownerContact.phone}
                  </a>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Mail size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>Email</p>
                  <a 
                    href={`mailto:${ownerContact.email}`}
                    style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 600,
                      color: 'white',
                      textDecoration: 'none'
                    }}
                  >
                    {ownerContact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && !usingMockData && (
            <div style={{
              background: '#fef2f2',
              border: '2px solid #fecaca',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <AlertCircle size={24} style={{ color: '#ef4444', flexShrink: 0 }} />
              <p style={{ color: '#991b1b', fontSize: '0.95rem', margin: 0 }}>
                {error}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div style={{
              textAlign: 'center',
              padding: '3rem'
            }}>
              <div style={{
                display: 'inline-block',
                width: '50px',
                height: '50px',
                border: '4px solid #f3f4f6',
                borderTopColor: '#22c55e',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading rooms...</p>
            </div>
          )}

          {/* Rooms Grid */}
          {!loading && (!rooms || rooms.length === 0) ? (
            <div className="bg-white rounded-xl shadow-sm p-16 text-center">
              <Home size={48} className="mx-auto mb-4 opacity-30 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                No Vacant Rooms
              </h3>
              <p className="text-gray-600">
                There are no vacant rooms available at {selectedLocation} currently. Please check back later.
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}>
              {(rooms || []).map((room) => {
                const roomPhoto = getRoomPhoto(room.capacity);

                return (
                  <div
                    key={room._id}
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }}
                  >
                    {/* Room Image */}
                    <div style={{
                      height: '200px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <img
                        src={roomPhoto}
                        alt={`${room.capacity} Share Room`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>

                    <div style={{ padding: '1.5rem' }}>
                      {/* Room Header */}
                      <div style={{
                        marginBottom: '1.5rem'
                      }}>
                        <h4 style={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: '#2d3748',
                          marginBottom: '0.5rem'
                        }}>
                          Room {room.roomNumber}
                        </h4>
                        <p style={{
                          fontSize: '1rem',
                          color: '#6b7280'
                        }}>
                          Floor {room.floor} • {room.capacity} Share
                        </p>
                      </div>

                      {/* Amenities */}
                      {room.amenities && room.amenities.length > 0 && (
                        <div style={{
                          marginBottom: '1.5rem'
                        }}>
                          <p style={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: '#6b7280',
                            marginBottom: '0.75rem'
                          }}>
                            Amenities:
                          </p>
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem'
                          }}>
                            {room.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                style={{
                                  fontSize: '0.75rem',
                                  padding: '0.25rem 0.75rem',
                                  background: '#eff6ff',
                                  color: '#3b82f6',
                                  borderRadius: '12px',
                                  border: '1px solid #dbeafe'
                                }}
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Rent and CTA */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '1.5rem',
                        borderTop: '2px solid #e5e7eb'
                      }}>
                        <div>
                          <p style={{
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            marginBottom: '0.25rem'
                          }}>
                            Monthly Rent
                          </p>
                          <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '0.25rem'
                          }}>
                            <IndianRupee size={18} style={{ color: '#2d3748' }} />
                            <span style={{
                              fontSize: '1.75rem',
                              fontWeight: 800,
                              color: '#2d3748'
                            }}>
                              {room.rentAmount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setSelectedRoom(room)}
                          style={{
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.4)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(34, 197, 94, 0.3)';
                          }}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
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

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const RoomLayoutModal = ({ room, onClose, onViewPhoto, roomPhoto }) => {
  const generateBedLayout = (capacity, currentOccupancy) => {
    const beds = [];
    const bedsPerRow = capacity <= 4 ? capacity : Math.ceil(capacity / 2);

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
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 50,
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: 'white',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              marginBottom: '0.25rem'
            }}>
              Room {room.roomNumber} - Bed Layout
            </h3>
            <p style={{
              fontSize: '0.95rem',
              opacity: 0.95
            }}>
              Floor {room.floor} • {availableBeds} bed(s) available
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: '2rem' }}>
          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: '#eff6ff',
              padding: '1rem',
              borderRadius: '12px',
              border: '2px solid #dbeafe'
            }}>
              <p style={{
                fontSize: '0.85rem',
                color: '#3b82f6',
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}>
                Total Beds
              </p>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: '#1e40af'
              }}>
                {room.capacity}
              </p>
            </div>
            <div style={{
              background: '#fef2f2',
              padding: '1rem',
              borderRadius: '12px',
              border: '2px solid #fecaca'
            }}>
              <p style={{
                fontSize: '0.85rem',
                color: '#ef4444',
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}>
                Occupied
              </p>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: '#991b1b'
              }}>
                {room.currentOccupancy}
              </p>
            </div>
            <div style={{
              background: '#f0fdf4',
              padding: '1rem',
              borderRadius: '12px',
              border: '2px solid #bbf7d0'
            }}>
              <p style={{
                fontSize: '0.85rem',
                color: '#22c55e',
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}>
                Available
              </p>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: '#166534'
              }}>
                {availableBeds}
              </p>
            </div>
          </div>

          {/* Legend */}
          <div style={{
            background: '#f9fafb',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <BedSingle size={24} style={{ color: '#22c55e' }} strokeWidth={2.5} />
              <span style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#374151'
              }}>
                Available (Click to view)
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <BedSingle size={24} style={{ color: '#ef4444' }} strokeWidth={2.5} />
              <span style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#374151'
              }}>
                Occupied
              </span>
            </div>
          </div>

          {/* Room Layout */}
          <h4 style={{
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#2d3748',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            Bed Arrangement
          </h4>

          <div style={{
            background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
            padding: '3rem',
            borderRadius: '16px',
            border: '2px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem'
            }}>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} style={{
                  display: 'flex',
                  gap: '2.5rem',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {beds
                    .filter(bed => bed.row === rowIndex)
                    .map(bed => (
                      <div
                        key={bed.id}
                        style={{ position: 'relative' }}
                        className="bed-container"
                      >
                        <button
                          onClick={() => handleBedClick(bed)}
                          disabled={bed.occupied}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: bed.occupied ? 'not-allowed' : 'pointer',
                            transition: 'transform 0.3s',
                            opacity: bed.occupied ? 0.75 : 1
                          }}
                          onMouseOver={(e) => {
                            if (!bed.occupied) {
                              e.currentTarget.style.transform = 'scale(1.1)';
                            }
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          title={bed.occupied ? 'Occupied' : 'Available - Click to view room photo'}
                        >
                          <BedSingle
                            size={90}
                            strokeWidth={2.5}
                            style={{
                              color: bed.occupied ? '#ef4444' : '#22c55e'
                            }}
                          />

                          {/* Bed Number Badge */}
                          <div style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: bed.occupied ? '#ef4444' : '#22c55e',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                          }}>
                            {bed.id}
                          </div>
                        </button>

                        {/* Tooltip */}
                        {!bed.occupied && (
                          <div style={{
                            position: 'absolute',
                            bottom: '-2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#1f2937',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            whiteSpace: 'nowrap',
                            opacity: 0,
                            pointerEvents: 'none',
                            transition: 'opacity 0.3s'
                          }}
                          className="bed-tooltip">
                            Click to view photo
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div style={{
            marginTop: '1.5rem',
            background: '#eff6ff',
            border: '2px solid #dbeafe',
            borderRadius: '12px',
            padding: '1rem',
            fontSize: '0.9rem',
            color: '#1e40af'
          }}>
            <span style={{ fontWeight: 600 }}>💡 Tip:</span> Click on any available (green) bed to view the room photo and get more details.
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              marginTop: '1.5rem',
              padding: '0.75rem',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#4b5563';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#6b7280';
            }}
          >
            Close Layout View
          </button>
        </div>

        <style>{`
          .bed-container:hover .bed-tooltip {
            opacity: 1 !important;
          }
        `}</style>
      </div>
    </div>
  );
};

const RoomPhotoModal = ({ room, onClose, roomPhoto }) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 60,
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          maxWidth: '1000px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
          color: 'white',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700
          }}>
            Room {room.roomNumber} - Photo Gallery
          </h3>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: '2rem' }}>
          <div style={{
            marginBottom: '1.5rem'
          }}>
            <img
              src={roomPhoto}
              alt={`Room ${room.roomNumber}`}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          <div style={{
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem'
            }}>
              <div>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  marginBottom: '0.25rem'
                }}>
                  Room Number:
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#2d3748'
                }}>
                  {room.roomNumber}
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  marginBottom: '0.25rem'
                }}>
                  Floor:
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#2d3748'
                }}>
                  {room.floor}
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  marginBottom: '0.25rem'
                }}>
                  Capacity:
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#2d3748'
                }}>
                  {room.capacity} persons
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  marginBottom: '0.25rem'
                }}>
                  Monthly Rent:
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#2d3748'
                }}>
                  ₹{room.rentAmount.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '100%',
              marginTop: '1.5rem',
              padding: '0.75rem',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#4b5563';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#6b7280';
            }}
          >
            Close Photo Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;