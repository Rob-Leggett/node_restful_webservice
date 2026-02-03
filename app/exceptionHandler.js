export const handle = (err, req, res, next) => {
  if (err.name === 'TokenNotFound' || err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
    return res.status(403).json({ error: 'Authentication Failed' });
  }

  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
};
