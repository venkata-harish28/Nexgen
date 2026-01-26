import mongoose from 'mongoose';

const leaveRequestSchema = new mongoose.Schema({
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
  leaveDate: {
    type: Date,
    required: true
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  reason: {
    type: String,
    required: true
  },
  refundAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

export default LeaveRequest;