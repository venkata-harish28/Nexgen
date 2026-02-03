import express from 'express';
import { authenticateTenant } from '../middleware/auth.js';
import Tenant from '../models/Tenant.js';
import Announcement from '../models/Announcement.js';
import Complaint from '../models/Complaint.js';
import Room from '../models/Room.js';
import Payment from '../models/Payment.js';
import LeaveRequest from '../models/LeaveRequest.js';
import Menu from '../models/Menu.js';

const router = express.Router();

// PUBLIC ROUTE - Get vacant rooms by location (no authentication required)
// This route must come BEFORE the authenticated routes to avoid conflicts
router.get('/rooms/vacant', async (req, res) => {
  try {
    const { location } = req.query;
    
    if (!location) {
      return res.status(400).json({ message: 'Location parameter is required' });
    }
    
    console.log(`[TENANT API] Fetching vacant rooms for location: ${location}`);
    
    // Find all rooms at the specified location
    const rooms = await Room.find({
      location: location
    }).sort({ roomNumber: 1 });
    
    console.log(`[TENANT API] Total rooms found: ${rooms.length}`);
    
    // Filter rooms that have available beds (currentOccupancy < capacity)
    const availableRooms = rooms.filter(room => room.currentOccupancy < room.capacity);
    
    console.log(`[TENANT API] Available rooms: ${availableRooms.length}`);
    
    // Also update isVacant status for all rooms (data consistency)
    for (const room of rooms) {
      const shouldBeVacant = room.currentOccupancy < room.capacity;
      if (room.isVacant !== shouldBeVacant) {
        room.isVacant = shouldBeVacant;
        await room.save();
      }
    }
    
    res.json(availableRooms);
  } catch (error) {
    console.error('[TENANT API] Error fetching vacant rooms:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Tenant login with passkey
router.post('/login', async (req, res) => {
  try {
    const { passkey } = req.body;
    
    console.log(`[TENANT LOGIN] Attempt with passkey: ${passkey}`);
    
    const tenant = await Tenant.findOne({ passkey, isActive: true });
    
    if (!tenant) {
      console.log(`[TENANT LOGIN] Failed - Invalid passkey or inactive tenant`);
      return res.status(401).json({ message: 'Invalid passkey' });
    }
    
    console.log(`[TENANT LOGIN] Success - Tenant: ${tenant.name}, Location: ${tenant.location}`);
    
    res.json({
      success: true,
      tenant: {
        id: tenant._id,
        name: tenant.name,
        email: tenant.email,
        phone: tenant.phone,
        roomNumber: tenant.roomNumber,
        location: tenant.location,
        rentAmount: tenant.rentAmount
      }
    });
  } catch (error) {
    console.error('[TENANT LOGIN] Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get announcements for tenant's location
router.get('/announcements', authenticateTenant, async (req, res) => {
  try {
    console.log(`[TENANT API] Fetching announcements for location: ${req.tenant.location}`);
    
    const announcements = await Announcement.find({
      location: req.tenant.location,
      isActive: true
    }).sort({ createdAt: -1 });
    
    console.log(`[TENANT API] Found ${announcements.length} announcements`);
    
    res.json(announcements);
  } catch (error) {
    console.error('[TENANT API] Error fetching announcements:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit a complaint
router.post('/complaints', authenticateTenant, async (req, res) => {
  try {
    const { subject, description, category } = req.body;
    
    console.log(`[TENANT API] Creating complaint for tenant: ${req.tenant.name}`);
    
    const complaint = new Complaint({
      tenantId: req.tenant._id,
      tenantName: req.tenant.name,
      roomNumber: req.tenant.roomNumber,
      location: req.tenant.location,
      subject,
      description,
      category
    });
    
    await complaint.save();
    console.log(`[TENANT API] Complaint created successfully`);
    
    res.status(201).json({ message: 'Complaint submitted successfully', complaint });
  } catch (error) {
    console.error('[TENANT API] Error creating complaint:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get tenant's complaints
router.get('/complaints', authenticateTenant, async (req, res) => {
  try {
    console.log(`[TENANT API] Fetching complaints for tenant: ${req.tenant.name}`);
    
    const complaints = await Complaint.find({
      tenantId: req.tenant._id
    }).sort({ createdAt: -1 });
    
    console.log(`[TENANT API] Found ${complaints.length} complaints`);
    
    res.json(complaints);
  } catch (error) {
    console.error('[TENANT API] Error fetching complaints:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Make a payment
router.post('/payments', authenticateTenant, async (req, res) => {
  try {
    const { amount, paymentMethod, transactionId, paymentMonth, paymentYear } = req.body;
    
    console.log(`[TENANT API] Creating payment for tenant: ${req.tenant.name}`);
    
    const payment = new Payment({
      tenantId: req.tenant._id,
      tenantName: req.tenant.name,
      roomNumber: req.tenant.roomNumber,
      location: req.tenant.location,
      amount,
      paymentMethod,
      transactionId,
      paymentMonth,
      paymentYear
    });
    
    await payment.save();
    
    // Update tenant's last payment date
    req.tenant.lastPaymentDate = new Date();
    await req.tenant.save();
    
    console.log(`[TENANT API] Payment created successfully`);
    
    res.status(201).json({ message: 'Payment recorded successfully', payment });
  } catch (error) {
    console.error('[TENANT API] Error creating payment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get tenant's payment history
router.get('/payments', authenticateTenant, async (req, res) => {
  try {
    console.log(`[TENANT API] Fetching payments for tenant: ${req.tenant.name}`);
    
    const payments = await Payment.find({
      tenantId: req.tenant._id
    }).sort({ paymentDate: -1 });
    
    console.log(`[TENANT API] Found ${payments.length} payments`);
    
    res.json(payments);
  } catch (error) {
    console.error('[TENANT API] Error fetching payments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit leave request
router.post('/leave-requests', authenticateTenant, async (req, res) => {
  try {
    const { leaveDate, reason } = req.body;
    
    console.log(`[TENANT API] Creating leave request for tenant: ${req.tenant.name}`);
    
    const leaveRequest = new LeaveRequest({
      tenantId: req.tenant._id,
      tenantName: req.tenant.name,
      roomNumber: req.tenant.roomNumber,
      location: req.tenant.location,
      leaveDate,
      reason
    });
    
    await leaveRequest.save();
    console.log(`[TENANT API] Leave request created successfully`);
    
    res.status(201).json({ message: 'Leave request submitted successfully', leaveRequest });
  } catch (error) {
    console.error('[TENANT API] Error creating leave request:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get tenant's leave requests
router.get('/leave-requests', authenticateTenant, async (req, res) => {
  try {
    console.log(`[TENANT API] Fetching leave requests for tenant: ${req.tenant.name}`);
    
    const leaveRequests = await LeaveRequest.find({
      tenantId: req.tenant._id
    }).sort({ createdAt: -1 });
    
    console.log(`[TENANT API] Found ${leaveRequests.length} leave requests`);
    
    res.json(leaveRequests);
  } catch (error) {
    console.error('[TENANT API] Error fetching leave requests:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get food menu for tenant's location
router.get('/menu', authenticateTenant, async (req, res) => {
  try {
    // Use location from query params if provided, otherwise use tenant's location
    const location = req.query.location || req.tenant.location;
    
    console.log(`[TENANT API] Fetching menu for location: ${location}`);
    
    const menu = await Menu.find({
      location: location
    }).sort({ day: 1 });
    
    console.log(`[TENANT API] Found ${menu.length} menu items`);
    
    res.json(menu);
  } catch (error) {
    console.error('[TENANT API] Error fetching menu:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;