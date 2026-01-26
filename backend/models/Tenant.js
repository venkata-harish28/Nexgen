import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  passkey: {
    type: String,
    required: true,
    unique: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  rentAmount: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastPaymentDate: {
    type: Date
  },
  nextPaymentDue: {
    type: Date
  }
}, {
  timestamps: true
});

const Tenant = mongoose.model('Tenant', tenantSchema);

export default Tenant;