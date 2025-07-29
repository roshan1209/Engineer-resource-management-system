const Project = require('../models/Project');
const {validationResult} = require('express-validator');

const getAllProjects = async (req, res) => {
  try {
      const { status } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    const projects = await Project.find(query);
    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json(project);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const createProject = async (req, res) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Access denied. Managers only.' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const projectData = {
      ...req.body,
      requiredSkills: req.body.requiredSkills.split(",").map(s => s.trim()).filter(Boolean),
      managerId: req.user.id
    };

    const project = await Project.create(projectData);
    return res.status(201).json(project);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const deleteProject = async (req, res) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Access denied. Managers only.' });
  }
  try {
    const assignment = await Project.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {getAllProjects,getProjectById,createProject,deleteProject}
