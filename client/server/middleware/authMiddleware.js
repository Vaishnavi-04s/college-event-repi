// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  // 1. Get token from header
  const token = req.header('x-auth-token');

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'No authentication token found' 
    });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Add user to request object
    req.user = await User.findById(decoded.user.id).select('-password');
    
    // 5. Continue to the next middleware/route
    next();
    
  } catch (err) {
    return res.status(401).json({ 
      success: false,
      error: 'Invalid or expired token' 
    });
  }
};