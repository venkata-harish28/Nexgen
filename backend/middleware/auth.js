import jwt from 'jsonwebtoken';
import Owner from '../models/Owner.js';
import Tenant from '../models/Tenant.js';

// Middleware to authenticate owner with JWT token
export const authenticateOwner = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        message: 'No authentication token provided',
        code: 'NO_TOKEN'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = await Owner.findById(decoded.id);

    if (!owner) {
      return res.status(401).json({ 
        message: 'Owner not found',
        code: 'OWNER_NOT_FOUND'
      });
    }

    req.owner = owner;
    next();
  } catch (error) {
    console.error('Owner authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid token',
        code: 'INVALID_TOKEN'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expired',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    res.status(401).json({ 
      message: 'Authentication failed',
      code: 'AUTH_FAILED'
    });
  }
};

// Middleware to authenticate tenant with passkey
export const authenticateTenant = async (req, res, next) => {
  try {
    const passkey = req.headers.passkey;

    if (!passkey) {
      console.log('[AUTH] No passkey provided in headers');
      return res.status(401).json({ 
        message: 'No passkey provided',
        code: 'NO_PASSKEY'
      });
    }

    console.log('[AUTH] Authenticating tenant with passkey:', passkey);

    const tenant = await Tenant.findOne({ passkey, isActive: true });

    if (!tenant) {
      console.log('[AUTH] Invalid passkey or inactive tenant');
      return res.status(401).json({ 
        message: 'Invalid passkey or inactive account',
        code: 'INVALID_PASSKEY'
      });
    }

    console.log('[AUTH] Tenant authenticated:', tenant.name);
    
    req.tenant = tenant;
    next();
  } catch (error) {
    console.error('[AUTH] Tenant authentication error:', error);
    res.status(401).json({ 
      message: 'Authentication failed',
      code: 'AUTH_FAILED'
    });
  }
};