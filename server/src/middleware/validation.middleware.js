const validator = require('validator');

const validateSignUp = (req, res, next) => {
  const { email, fullName, password } = req.body;
  const errors = [];

  if (!email || !validator.isEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!fullName || fullName.trim().length < 3) {
    errors.push('Full name must be at least 3 characters');
  }

  if (!password || !validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase, number and symbol');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors 
    });
  }

  next();
};

const validateProduct = (req, res, next) => {
  const { name, price, stock, category } = req.body;
  const errors = [];

  if (!name || name.trim().length < 3) {
    errors.push('Product name must be at least 3 characters');
  }

  if (typeof price !== 'number' || price < 0) {
    errors.push('Valid price is required');
  }

  if (typeof stock !== 'number' || stock < 0) {
    errors.push('Valid stock quantity is required');
  }

  const validCategories = ['Mobile', 'Mobile Accessories', 'Tablet', 'Laptop'];
  if (category && !validCategories.includes(category)) {
    errors.push(`Category must be one of: ${validCategories.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors 
    });
  }

  next();
};

const sanitizeInput = (req, res, next) => {
  // Sanitize string inputs to prevent XSS
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = validator.escape(req.body[key].trim());
      }
    });
  }
  next();
};

module.exports = {
  validateSignUp,
  validateProduct,
  sanitizeInput
};