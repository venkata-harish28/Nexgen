import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  tenantName: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['maintenance', 'cleanliness', 'food', 'noise', 'security', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'closed'],
    default: 'pending'
  },
  adminResponse: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;