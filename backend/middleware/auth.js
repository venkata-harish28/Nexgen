import jwt from 'jsonwebtoken';
import Tenant from '../models/Tenant.js';
import Owner from '../models/Owner.js';

// Tenant authentication middleware
export const authenticateTenant = async (req, res, next) => {
  try {
    const { passkey } = req.headers;

    if (!passkey) {
      return res.status(401).json({ 
        message: 'No passkey provided',
        code: 'NO_PASSKEY'
      });
    }

    const tenant = await Tenant.findOne({ passkey, isActive: true });

    if (!tenant) {
      return res.status(401).json({ 
        message: 'Invalid passkey or inactive tenant',
        code: 'INVALID_PASSKEY'
      });
    }

    req.tenant = tenant;
    next();
  } catch (error) {
    console.error('[Auth] Tenant authentication error:', error);
    res.status(401).json({ 
      message: 'Authentication failed', 
      error: error.message,
      code: 'AUTH_ERROR'
    });
  }
};

// Owner authentication middleware
export const authenticateOwner = async (req, res, next) => {
  try {
    let token;

    // Extract token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        message: 'Not authorized, no token provided',
        code: 'NO_TOKEN'
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: 'Token has expired',
          code: 'TOKEN_EXPIRED'
        });
      }
      return res.status(401).json({ 
        message: 'Invalid token',
        code: 'INVALID_TOKEN'
      });
    }

    // Find owner
    const owner = await Owner.findById(decoded.id).select('-password');

    if (!owner) {
      return res.status(401).json({ 
        message: 'Owner not found',
        code: 'OWNER_NOT_FOUND'
      });
    }

    req.owner = owner;
    next();
  } catch (error) {
    console.error('[Auth] Owner authentication error:', error);
    res.status(401).json({ 
      message: 'Not authorized, authentication failed', 
      error: error.message,
      code: 'AUTH_ERROR'
    });
  }
};

// Optional: Rate limiting middleware for login attempts
export const loginRateLimiter = () => {
  const attempts = new Map();
  const MAX_ATTEMPTS = 5;
  const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

  return (req, res, next) => {
    const identifier = req.body.passkey || req.body.username || req.body.phone || req.ip;
    const now = Date.now();
    
    if (!attempts.has(identifier)) {
      attempts.set(identifier, { count: 1, resetTime: now + WINDOW_MS });
      return next();
    }

    const record = attempts.get(identifier);
    
    if (now > record.resetTime) {
      attempts.set(identifier, { count: 1, resetTime: now + WINDOW_MS });
      return next();
    }

    if (record.count >= MAX_ATTEMPTS) {
      return res.status(429).json({ 
        message: 'Too many login attempts. Please try again later.',
        code: 'TOO_MANY_ATTEMPTS',
        retryAfter: Math.ceil((record.resetTime - now) / 1000)
      });
    }

    record.count++;
    next();
  };
};