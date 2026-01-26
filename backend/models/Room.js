import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  currentOccupancy: {
    type: Number,
    default: 0
  },
  isVacant: {
    type: Boolean,
    default: true
  },
  rentAmount: {
    type: Number,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  amenities: [{
    type: String
  }]
}, {
  timestamps: true
});

const Room = mongoose.model('Room', roomSchema);

export default Room;