const { body } = require('express-validator');

const createProjectValidator = [
  body('name').notEmpty().withMessage('Project name is required'),
  body('description').optional().isString(),
  body('startDate').isISO8601().withMessage('Valid start date required'),
  body('endDate').isISO8601().withMessage('Valid end date required'),
  body('requiredSkills').isString().withMessage('Required skills is needed'),
  body('teamSize').isNumeric().withMessage('Team size must be a number'),
  body('status').isIn(['planning', 'active', 'completed']).withMessage('Invalid project status')
];

module.exports = {
  createProjectValidator
};
