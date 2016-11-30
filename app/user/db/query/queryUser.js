const User = require('../model/user');

function getByName(name) {
  return User.findOne({ name: name });
}

// set up endpoint functions and pass them via module.exports
module.exports = {
  getByName
};