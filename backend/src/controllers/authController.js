const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password, name, role, skills, seniority, maxCapacity, department } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    let processedSkills = [];
    if (Array.isArray(skills)) {
      processedSkills = skills.map(s => s.trim()).filter(Boolean);
    } else if (typeof skills === "string") {
      processedSkills = skills.split(",").map(s => s.trim()).filter(Boolean);
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role,
      skills: processedSkills,
      seniority,
      maxCapacity,
      department
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        department: user.department,
        name: user.name,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};



const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


module.exports = {register,login,profile}

