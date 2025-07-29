const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  requiredSkills: {
    type: [String],
    default: []
  },
  teamSize: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['planning', 'active', 'completed'],
    required: true
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

module.exports = mongoose.model('Project', ProjectSchema);