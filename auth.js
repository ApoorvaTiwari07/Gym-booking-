// auth.js - Token Authentication & Role Middleware
const crypto = require('crypto');
const db = require('./db');

// In-memory token store mapping token -> user
const activeTokens = new Map();

function createToken(user) {
  const token = crypto.randomBytes(32).toString('hex');
  activeTokens.set(token, {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });
  return token;
}

// Authentication middleware on all non-public routes
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Please log in to access this resource' });
  }

  const token = authHeader.slice(7).trim();
  const session = activeTokens.get(token);

  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }

  req.user = session;
  next();
}

// Role check middleware for admin routes
function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
}

module.exports = {
  createToken,
  authMiddleware,
  adminMiddleware,
};
