const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['engineer', 'manager'],
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  seniority: {
    type: String,
    enum: ['junior', 'mid', 'senior']
  },
  maxCapacity: {
    type: Number,
    required: true
  },
  department: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
