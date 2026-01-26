import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { authenticateOwner } from '../middleware/auth.js';
import Owner from '../models/Owner.js';
import Tenant from '../models/Tenant.js';
import Announcement from '../models/Announcement.js';
import Complaint from '../models/Complaint.js';
import Room from '../models/Room.js';
import Payment from '../models/Payment.js';
import LeaveRequest from '../models/LeaveRequest.js';
import Menu from '../models/Menu.js';

const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Owner login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const owner = await Owner.findOne({ username });
    
    if (owner && (await owner.matchPassword(password))) {
      res.json({
        success: true,
        owner: {
          id: owner._id,
          name: owner.name,
          email: owner.email,
          username: owner.username
        },
        token: generateToken(owner._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create announcement
router.post('/announcements', authenticateOwner, async (req, res) => {
  try {
    const { title, content, location, priority } = req.body;
    
    const announcement = new Announcement({
      title,
      content,
      location,
      priority,
      createdBy: req.owner.name
    });
    
    await announcement.save();
    res.status(201).json({ message: 'Announcement created successfully', announcement });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all announcements
router.get('/announcements', authenticateOwner, async (req, res) => {
  try {
    const { location } = req.query;
    const filter = location ? { location } : {};
    
    const announcements = await Announcement.find(filter).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update announcement
router.put('/announcements/:id', authenticateOwner, async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    res.json({ message: 'Announcement updated successfully', announcement });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete announcement
router.delete('/announcements/:id', authenticateOwner, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all complaints
router.get('/complaints', authenticateOwner, async (req, res) => {
  try {
    const { location, status } = req.query;
    const filter = {};
    if (location) filter.location = location;
    if (status) filter.status = status;
    
    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update complaint status
router.put('/complaints/:id', authenticateOwner, async (req, res) => {
  try {
    const { status, adminResponse } = req.body;
    
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, adminResponse },
      { new: true }
    );
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    res.json({ message: 'Complaint updated successfully', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create tenant with auto-generated passkey
router.post('/tenants', authenticateOwner, async (req, res) => {
  try {
    const { name, email, phone, roomNumber, location, rentAmount } = req.body;
    
    // Generate unique passkey
    const passkey = `HST-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    const tenant = new Tenant({
      name,
      email,
      phone,
      passkey,
      roomNumber,
      location,
      rentAmount
    });
    
    await tenant.save();
    
    // Update room occupancy
    await Room.findOneAndUpdate(
      { roomNumber, location },
      { $inc: { currentOccupancy: 1 } }
    );
    
    res.status(201).json({ 
      message: 'Tenant created successfully', 
      tenant,
      passkey 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all tenants
router.get('/tenants', authenticateOwner, async (req, res) => {
  try {
    const { location } = req.query;
    const filter = location ? { location } : {};
    
    const tenants = await Tenant.find(filter).sort({ joinDate: -1 });
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update tenant
router.put('/tenants/:id', authenticateOwner, async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    
    res.json({ message: 'Tenant updated successfully', tenant });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all payments
router.get('/payments', authenticateOwner, async (req, res) => {
  try {
    const { location, month, year } = req.query;
    const filter = {};
    if (location) filter.location = location;
    if (month) filter.paymentMonth = month;
    if (year) filter.paymentYear = parseInt(year);
    
    const payments = await Payment.find(filter).sort({ paymentDate: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all leave requests
router.get('/leave-requests', authenticateOwner, async (req, res) => {
  try {
    const { location, status } = req.query;
    const filter = {};
    if (location) filter.location = location;
    if (status) filter.status = status;
    
    const leaveRequests = await LeaveRequest.find(filter).sort({ createdAt: -1 });
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update leave request
router.put('/leave-requests/:id', authenticateOwner, async (req, res) => {
  try {
    const { status, adminNotes, refundAmount } = req.body;
    
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes, refundAmount },
      { new: true }
    );
    
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    
    // If approved, deactivate tenant
    if (status === 'approved') {
      await Tenant.findByIdAndUpdate(leaveRequest.tenantId, { isActive: false });
      
      // Update room occupancy
      await Room.findOneAndUpdate(
        { roomNumber: leaveRequest.roomNumber, location: leaveRequest.location },
        { $inc: { currentOccupancy: -1 } }
      );
    }
    
    res.json({ message: 'Leave request updated successfully', leaveRequest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create or update menu
router.post('/menu', authenticateOwner, async (req, res) => {
  try {
    const { location, day, breakfast, lunch, snacks, dinner } = req.body;
    
    let menu = await Menu.findOne({ location, day });
    
    if (menu) {
      menu.breakfast = breakfast;
      menu.lunch = lunch;
      menu.snacks = snacks;
      menu.dinner = dinner;
      await menu.save();
    } else {
      menu = new Menu({ location, day, breakfast, lunch, snacks, dinner });
      await menu.save();
    }
    
    res.json({ message: 'Menu saved successfully', menu });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get menu
router.get('/menu', authenticateOwner, async (req, res) => {
  try {
    const { location } = req.query;
    const filter = location ? { location } : {};
    
    const menu = await Menu.find(filter).sort({ day: 1 });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create room
router.post('/rooms', authenticateOwner, async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json({ message: 'Room created successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all rooms
router.get('/rooms', authenticateOwner, async (req, res) => {
  try {
    const { location } = req.query;
    const filter = location ? { location } : {};
    
    const rooms = await Room.find(filter).sort({ roomNumber: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update room
router.put('/rooms/:id', authenticateOwner, async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Update vacancy status based on occupancy
    if (room.currentOccupancy >= room.capacity) {
      room.isVacant = false;
    } else {
      room.isVacant = true;
    }
    await room.save();
    
    res.json({ message: 'Room updated successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Dashboard stats
router.get('/dashboard/stats', authenticateOwner, async (req, res) => {
  try {
    const { location } = req.query;
    const filter = location ? { location } : {};
    
    const totalTenants = await Tenant.countDocuments({ ...filter, isActive: true });
    const totalRooms = await Room.countDocuments(filter);
    const vacantRooms = await Room.countDocuments({ ...filter, isVacant: true });
    const pendingComplaints = await Complaint.countDocuments({ ...filter, status: 'pending' });
    const pendingLeaveRequests = await LeaveRequest.countDocuments({ ...filter, status: 'pending' });
    
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();
    
    const monthlyRevenue = await Payment.aggregate([
      { 
        $match: { 
          ...filter,
          paymentMonth: currentMonth,
          paymentYear: currentYear,
          status: 'completed'
        } 
      },
      { 
        $group: { 
          _id: null, 
          total: { $sum: '$amount' } 
        } 
      }
    ]);
    
    res.json({
      totalTenants,
      totalRooms,
      vacantRooms,
      occupiedRooms: totalRooms - vacantRooms,
      pendingComplaints,
      pendingLeaveRequests,
      monthlyRevenue: monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;