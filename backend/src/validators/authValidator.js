const { body } = require('express-validator');

const registerValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),
  body('role').isIn(['engineer', 'manager']).withMessage('Role must be engineer or manager'),
  body('maxCapacity').isNumeric().withMessage('Max capacity must be a number')
];

const loginValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
];

module.exports = {
  registerValidator,
  loginValidator
};
