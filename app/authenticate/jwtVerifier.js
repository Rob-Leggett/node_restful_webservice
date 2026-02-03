import jwt from 'jsonwebtoken';
import config from '../configuration/config.js';

class TokenNotFoundError extends Error {
  constructor() {
    super('Token not found');
    this.name = 'TokenNotFound';
  }
}

const jwtVerifier = (req, res, next) => {
  const token = req.headers.token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return next(new TokenNotFoundError());
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return next(err);
    }
    req.user = decoded;
    next();
  });
};

export default jwtVerifier;