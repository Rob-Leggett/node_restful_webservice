function handle(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({'error': 'invalid token supplied'});
  }
}

// set up exception handler and pass it via module.exports
module.exports = {
  handle
};
