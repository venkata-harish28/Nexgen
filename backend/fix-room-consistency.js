import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';
import Tenant from './models/Tenant.js';

dotenv.config();

/**
 * Database Consistency Check and Fix Script
 * 
 * This script:
 * 1. Connects to MongoDB
 * 2. Checks all rooms for correct occupancy vs capacity
 * 3. Fixes isVacant status based on actual occupancy
 * 4. Verifies tenant counts match room occupancy
 */

const fixRoomConsistency = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Get all rooms
    const rooms = await Room.find({});
    console.log(`\nFound ${rooms.length} rooms to check\n`);

    let fixedCount = 0;
    let inconsistentCount = 0;

    for (const room of rooms) {
      // Count actual tenants in this room
      const actualTenantCount = await Tenant.countDocuments({
        roomNumber: room.roomNumber,
        location: room.location,
        isActive: true
      });

      const shouldBeVacant = room.currentOccupancy < room.capacity;
      const occupancyNeedsUpdate = actualTenantCount !== room.currentOccupancy;
      const vacancyNeedsUpdate = room.isVacant !== shouldBeVacant;

      if (occupancyNeedsUpdate || vacancyNeedsUpdate) {
        inconsistentCount++;
        
        console.log(`\n⚠️  Inconsistency found in Room ${room.roomNumber} (${room.location}):`);
        console.log(`   Database occupancy: ${room.currentOccupancy}`);
        console.log(`   Actual tenant count: ${actualTenantCount}`);
        console.log(`   Capacity: ${room.capacity}`);
        console.log(`   Current isVacant: ${room.isVacant}`);
        console.log(`   Should be vacant: ${shouldBeVacant}`);

        // Fix the room
        room.currentOccupancy = actualTenantCount;
        room.isVacant = actualTenantCount < room.capacity;
        await room.save();

        fixedCount++;
        console.log(`   ✓ Fixed! New occupancy: ${room.currentOccupancy}, isVacant: ${room.isVacant}`);
      } else {
        console.log(`✓ Room ${room.roomNumber} (${room.location}) is consistent`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY:');
    console.log('='.repeat(60));
    console.log(`Total rooms checked: ${rooms.length}`);
    console.log(`Inconsistencies found: ${inconsistentCount}`);
    console.log(`Rooms fixed: ${fixedCount}`);
    console.log('='.repeat(60) + '\n');

    if (fixedCount === 0) {
      console.log('✓ All rooms are consistent! No fixes needed.\n');
    } else {
      console.log(`✓ Successfully fixed ${fixedCount} room(s)!\n`);
    }

    // Display current room status
    console.log('\nCURRENT ROOM STATUS:');
    console.log('='.repeat(60));
    
    const roomsByLocation = await Room.aggregate([
      {
        $group: {
          _id: '$location',
          totalRooms: { $sum: 1 },
          totalCapacity: { $sum: '$capacity' },
          totalOccupied: { $sum: '$currentOccupancy' },
          vacantRooms: {
            $sum: {
              $cond: ['$isVacant', 1, 0]
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    for (const loc of roomsByLocation) {
      console.log(`\n${loc._id}:`);
      console.log(`  Total Rooms: ${loc.totalRooms}`);
      console.log(`  Total Capacity: ${loc.totalCapacity} beds`);
      console.log(`  Currently Occupied: ${loc.totalOccupied} beds`);
      console.log(`  Available Beds: ${loc.totalCapacity - loc.totalOccupied} beds`);
      console.log(`  Rooms with Available Beds: ${loc.vacantRooms}`);
      console.log(`  Occupancy Rate: ${Math.round((loc.totalOccupied / loc.totalCapacity) * 100)}%`);
    }

    console.log('\n' + '='.repeat(60) + '\n');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✓ Disconnected from MongoDB\n');
    process.exit(0);
  }
};

// Run the script
console.log('\n' + '='.repeat(60));
console.log('HOSTEL MANAGEMENT - DATABASE CONSISTENCY CHECK');
console.log('='.repeat(60) + '\n');

fixRoomConsistency();