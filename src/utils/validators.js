// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isStrongPassword = (password) => {
  if (password.length < 8) return false;
  
  // Check for at least one uppercase letter, one lowercase letter, one number, and one special character
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
};

// Validate that a string is not empty
export const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
};

// Validate a number is within a range
export const isInRange = (number, min, max) => {
  return number >= min && number <= max;
};

// Validate a value is a number
export const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

// Validate a URL format
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

// Validate a date is in the future
export const isFutureDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  return date > now;
};

// Validate form input values
export const validateFormInputs = (inputs, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = inputs[field];
    
    if (fieldRules.required && !isNotEmpty(value)) {
      errors[field] = 'This field is required';
    } else if (fieldRules.email && !isValidEmail(value)) {
      errors[field] = 'Please enter a valid email address';
    } else if (fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = `Must be at least ${fieldRules.minLength} characters`;
    } else if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[field] = `Cannot exceed ${fieldRules.maxLength} characters`;
    } else if (fieldRules.pattern && !new RegExp(fieldRules.pattern).test(value)) {
      errors[field] = fieldRules.patternMessage || 'Invalid format';
    } else if (fieldRules.match && inputs[fieldRules.match] !== value) {
      errors[field] = `Must match ${fieldRules.matchLabel || fieldRules.match}`;
    }
  });
  
  return errors;
};
