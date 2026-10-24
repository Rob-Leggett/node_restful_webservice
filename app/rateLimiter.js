import { rateLimit } from 'express-rate-limit';

const windowMs = 15 * 60 * 1000;

export const apiLimiter = rateLimit({
  windowMs,
  limit: parseInt(process.env.RATE_LIMIT_MAX || '300', 10),
  standardHeaders: 'draft-8',
  legacyHeaders: false
});

// Stricter limit for credential checks to slow down brute-force attempts
export const authLimiter = rateLimit({
  windowMs,
  limit: parseInt(process.env.AUTH_RATE_LIMIT_MAX || '20', 10),
  standardHeaders: 'draft-8',
  legacyHeaders: false
});
