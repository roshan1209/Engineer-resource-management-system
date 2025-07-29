const { body } = require('express-validator');

const createAssignmentValidator = [
  body('engineer').notEmpty().withMessage('Engineer ID is required'),
  body('project').notEmpty().withMessage('Project ID is required'),
  body('allocationPercentage').isNumeric().withMessage('Allocation percentage must be a number'),
  body('startDate').isISO8601().withMessage('Valid start date required'),
  body('endDate').isISO8601().withMessage('Valid end date required'),
  body('role').notEmpty().withMessage('Role is required')
];

const updateAssignmentValidator = [
  body('allocationPercentage').optional().isNumeric().withMessage('Allocation percentage must be a number'),
  body('startDate').optional().isISO8601().withMessage('Valid start date required'),
  body('endDate').optional().isISO8601().withMessage('Valid end date required'),
  body('role').optional().notEmpty().withMessage('Role cannot be empty')
];

module.exports = {
  createAssignmentValidator,
  updateAssignmentValidator
};
