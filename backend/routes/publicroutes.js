import express from 'express';
import Room from '../models/Room.js';

const router = express.Router();

// PUBLIC ROUTE - Get vacant rooms by location (no authentication required)
router.get('/rooms/vacant', async (req, res) => {
  try {
    const { location } = req.query;
    
    // Build filter
    const filter = {};
    if (location && location !== 'all') {
      filter.location = location;
    }
    
    // Find all rooms at the location
    const rooms = await Room.find(filter).sort({ roomNumber: 1 });
    
    // Filter rooms that have available beds (currentOccupancy < capacity)
    const availableRooms = rooms.filter(room => room.currentOccupancy < room.capacity);
    
    // Also update isVacant status for consistency (optional)
    for (const room of rooms) {
      const shouldBeVacant = room.currentOccupancy < room.capacity;
      if (room.isVacant !== shouldBeVacant) {
        room.isVacant = shouldBeVacant;
        await room.save();
      }
    }
    
    res.json(availableRooms);
  } catch (error) {
    console.error('Error fetching vacant rooms:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUBLIC ROUTE - Get all rooms by location (for browsing, no authentication required)
router.get('/rooms', async (req, res) => {
  try {
    const { location } = req.query;
    const filter = location ? { location } : {};
    
    const rooms = await Room.find(filter).sort({ roomNumber: 1 });
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;