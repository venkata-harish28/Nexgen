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

// Tenant login with passkey
router.post('/login', async (req, res) => {
  try {
    const { passkey } = req.body;
    
    const tenant = await Tenant.findOne({ passkey, isActive: true });
    
    if (!tenant) {
      return res.status(401).json({ message: 'Invalid passkey' });
    }
    
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
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get announcements for tenant's location
router.get('/announcements', authenticateTenant, async (req, res) => {
  try {
    const announcements = await Announcement.find({
      location: req.tenant.location,
      isActive: true
    }).sort({ createdAt: -1 });
    
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit a complaint
router.post('/complaints', authenticateTenant, async (req, res) => {
  try {
    const { subject, description, category } = req.body;
    
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
    res.status(201).json({ message: 'Complaint submitted successfully', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get tenant's complaints
router.get('/complaints', authenticateTenant, async (req, res) => {
  try {
    const complaints = await Complaint.find({
      tenantId: req.tenant._id
    }).sort({ createdAt: -1 });
    
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get vacant rooms at tenant's location - UPDATED TO SHOW ROOMS WITH AVAILABLE BEDS
router.get('/rooms/vacant', authenticateTenant, async (req, res) => {
  try {
    // Find rooms that have at least one available bed
    const rooms = await Room.find({
      location: req.tenant.location,
      $expr: { $lt: ['$currentOccupancy', '$capacity'] } // currentOccupancy < capacity
    }).sort({ roomNumber: 1 });
    
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Make a payment
router.post('/payments', authenticateTenant, async (req, res) => {
  try {
    const { amount, paymentMethod, transactionId, paymentMonth, paymentYear } = req.body;
    
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
    
    res.status(201).json({ message: 'Payment recorded successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get tenant's payment history
router.get('/payments', authenticateTenant, async (req, res) => {
  try {
    const payments = await Payment.find({
      tenantId: req.tenant._id
    }).sort({ paymentDate: -1 });
    
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit leave request
router.post('/leave-requests', authenticateTenant, async (req, res) => {
  try {
    const { leaveDate, reason } = req.body;
    
    const leaveRequest = new LeaveRequest({
      tenantId: req.tenant._id,
      tenantName: req.tenant.name,
      roomNumber: req.tenant.roomNumber,
      location: req.tenant.location,
      leaveDate,
      reason
    });
    
    await leaveRequest.save();
    res.status(201).json({ message: 'Leave request submitted successfully', leaveRequest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get tenant's leave requests
router.get('/leave-requests', authenticateTenant, async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({
      tenantId: req.tenant._id
    }).sort({ createdAt: -1 });
    
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get food menu for tenant's location
router.get('/menu', authenticateTenant, async (req, res) => {
  try {
    const menu = await Menu.find({
      location: req.tenant.location
    }).sort({ day: 1 });
    
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;