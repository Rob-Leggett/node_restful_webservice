function handle(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(403).json({error: 'Invalid token supplied'});
  }
}

// set up exception handler and pass it via module.exports
module.exports = {
  handle
};
