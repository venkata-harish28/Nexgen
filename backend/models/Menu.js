import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  breakfast: {
    type: String,
    default: ''
  },
  lunch: {
    type: String,
    default: ''
  },
  snacks: {
    type: String,
    default: ''
  },
  dinner: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;