function get(req, res) {
  res.status(200).json({});
}

function save(req, res) {
  res.status(200).json({});
}

function update(req, res) {
  res.status(200).json({});
}

function remove(req, res) {
  res.status(200).json({});
}

// set up endpoint functions and pass them via module.exports
module.exports = {
  get,
  save,
  update,
  remove
};