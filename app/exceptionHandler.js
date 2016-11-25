function handle(err, req, res, next) {

  if (err.name === 'TokenNotFound' || err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
    res.status(403).json({error: 'Authentication Failed'});
  }
}

// set up exception handler and pass it via module.exports
module.exports = {
  handle
};
