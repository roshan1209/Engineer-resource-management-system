const User = require('../models/User');
const Assignment = require('../models/Assignment');

const getAllEngineers = async (req, res) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Access denied. Managers only.' });
  }
  try {
    const { skill } = req.query;
    const query = { role: "engineer" };

    if (skill) {
      query.skills = { $regex: skill, $options: "i" };
    }

    const engineers = await User.find(query).select("-password");
    res.json(engineers);
    return res.status(200).json(engineers);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getEngineerById = async (req, res) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Access denied. Managers only.' });
  }
  try {
    const engineer = await User.findOne({ _id: req.params.id, role: 'engineer' }).select('-password');
    if (!engineer) {
      return res.status(404).json({ message: 'Engineer not found' });
    }
    return res.status(200).json(engineer);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const calculateEngineerCapacity = async (req, res) => {
  try {
    const engineer = await User.findById(req.params.id);
    if (!engineer || engineer.role !== 'engineer') {
      return res.status(404).json({ message: 'Engineer not found' });
    }

    const now = new Date();
    const activeAssignments = await Assignment.find({
      engineer: req.params.id,
      startDate: { $lte: now },
      endDate: { $gte: now }
    });

    const totalAllocated = activeAssignments.reduce(
      (sum, a) => sum + (a.allocationPercentage || 0),
      0
    );

    const availableCapacity = Math.max(0, engineer.maxCapacity - totalAllocated);

    res.json({
      availableCapacity,
      allocatedPercentage: totalAllocated
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch capacity' });
  }
};


module.exports = {getAllEngineers, getEngineerById, calculateEngineerCapacity}
