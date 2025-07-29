const express = require('express');
const { getAllAssignments, createAssignment, updateAssignment, deleteAssignment } = require('../controllers/assignmentController');
const {createAssignmentValidator, updateAssignmentValidator} = require('../validators/assignmentValidator');

const router = express.Router();

router.get('/', getAllAssignments);
router.post('/', createAssignmentValidator, createAssignment);
router.put('/:id', updateAssignmentValidator, updateAssignment);
router.delete('/:id',deleteAssignment);


module.exports = router;
