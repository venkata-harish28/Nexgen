import jwt from 'jsonwebtoken';
import Tenant from '../models/Tenant.js';
import Owner from '../models/Owner.js';

export const authenticateTenant = async (req, res, next) => {
  try {
    const { passkey } = req.headers;

    if (!passkey) {
      return res.status(401).json({ message: 'No passkey provided' });
    }

    const tenant = await Tenant.findOne({ passkey, isActive: true });

    if (!tenant) {
      return res.status(401).json({ message: 'Invalid passkey or inactive tenant' });
    }

    req.tenant = tenant;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

export const authenticateOwner = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.owner = await Owner.findById(decoded.id).select('-password');

    if (!req.owner) {
      return res.status(401).json({ message: 'Owner not found' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed', error: error.message });
  }
};