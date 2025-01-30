import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token:', token); // Add logging
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      console.log('Authenticated User:', req.user); // Add logging
      next();
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  } else {
    if (!token) {
      res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
  }
};

export default authMiddleware;