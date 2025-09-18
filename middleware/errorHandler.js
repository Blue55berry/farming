const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Check for MongoDB validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ 
      errors: errors
    });
  }
  
  // Check for MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      errors: ['Duplicate key error. This record already exists.']
    });
  }
  
  res.status(500).json({
    message: err.message || 'Something went wrong on the server',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};

module.exports = errorHandler;
