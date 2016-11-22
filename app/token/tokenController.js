function get(req, res) {
  res.status(200).json({});
}

// set up endpoint functions and pass them via module.exports
module.exports = {
  get
};