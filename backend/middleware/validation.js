const { body, validationResult } = require('express-validator');


// Validation rules for creating a contact
const validateContact = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('favoriteColor').optional().trim(),
  body('birthday').optional().isDate().withMessage('Birthday must be a valid date (YYYY-MM-DD)'),
 
  // Middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];


// Validation rules for updating a contact
const validateUpdate = [
  body('firstName').optional().trim().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().trim().notEmpty().withMessage('Last name cannot be empty'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('favoriteColor').optional().trim(),
  body('birthday').optional().isDate().withMessage('Birthday must be a valid date (YYYY-MM-DD)'),
 
  // Check that at least one field is being updated
  body().custom(value => {
    const updates = Object.keys(value);
    if (updates.length === 0) {
      throw new Error('At least one field must be provided for update');
    }
    return true;
  }),
 
  // Middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];


module.exports = {
  validateContact,
  validateUpdate
};
