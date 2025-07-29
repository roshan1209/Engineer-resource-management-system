const Assignment = require('../models/Assignment');
const {validationResult} = require('express-validator');

const getAllAssignments = async (req, res) => {
  try {
    let filter = {};

    console.log(req.user);
    
    if (req.user?.role === "engineer") {
      filter.engineer = req.user.id;
    }

    const assignments = await Assignment.find(filter)
      .populate({
        path: "engineer",
        select: "-password"
      })
      .populate({
        path: "project"
      });

    return res.status(200).json(assignments);
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};



const createAssignment = async (req, res) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Access denied. Managers only.' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const assignment = await Assignment.create(req.body);
    return res.status(201).json(assignment);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


const updateAssignment = async (req, res) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Access denied. Managers only.' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    return res.status(200).json(assignment);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const deleteAssignment = async (req, res) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Access denied. Managers only.' });
  }
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    return res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {getAllAssignments, deleteAssignment,updateAssignment,createAssignment}
