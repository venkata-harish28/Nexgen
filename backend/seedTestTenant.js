import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tenant from './models/Tenant.js';
import Room from './models/Room.js';

dotenv.config();

const seedTestTenant = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if test tenant already exists
    const existingTenant = await Tenant.findOne({ passkey: 'HST-TEST1234' });
    
    if (existingTenant) {
      console.log('ℹ️  Test tenant already exists');
      console.log('📝 Passkey: HST-TEST1234');
      console.log('👤 Name:', existingTenant.name);
      console.log('🏠 Room:', existingTenant.roomNumber);
      console.log('📍 Location:', existingTenant.location);
      await mongoose.disconnect();
      return;
    }

    // Create or find test room
    let testRoom = await Room.findOne({ roomNumber: '101', location: 'Location A' });
    
    if (!testRoom) {
      testRoom = new Room({
        roomNumber: '101',
        location: 'Location A',
        capacity: 3,
        currentOccupancy: 0,
        isVacant: true,
        rentAmount: 5000,
        floor: 1,
        amenities: ['WiFi', 'AC', 'Attached Bathroom']
      });
      await testRoom.save();
      console.log('✅ Created test room 101');
    }

    // Create test tenant
    const testTenant = new Tenant({
      name: 'Test Tenant',
      email: 'test@example.com',
      phone: '1234567890',
      passkey: 'HST-TEST1234',
      roomNumber: '101',
      location: 'Location A',
      rentAmount: 5000,
      isActive: true,
      joinDate: new Date()
    });

    await testTenant.save();

    // Update room occupancy
    testRoom.currentOccupancy += 1;
    testRoom.isVacant = testRoom.currentOccupancy < testRoom.capacity;
    await testRoom.save();

    console.log('\n✅ Test tenant created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 Use this passkey to login:');
    console.log('   HST-TEST1234');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Name:', testTenant.name);
    console.log('📧 Email:', testTenant.email);
    console.log('📱 Phone:', testTenant.phone);
    console.log('🏠 Room:', testTenant.roomNumber);
    console.log('📍 Location:', testTenant.location);
    console.log('💰 Rent:', testTenant.rentAmount);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error seeding test tenant:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedTestTenant();