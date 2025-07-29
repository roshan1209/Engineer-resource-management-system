const express = require('express');
const { createProjectValidator } = require('../validators/projectValidator');
const { createProject, getAllProjects, getProjectById, deleteProject } = require('../controllers/projectController');

const router = express.Router();

router.post('/',createProjectValidator, createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.delete('/:id',deleteProject);


module.exports = router;