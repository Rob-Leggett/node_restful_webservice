const jwt = require('jsonwebtoken');

const config = require("../configuration/config");

const User = require('../user/db/model/user');

function authenticate(req, res) {

  User.findOne({ name: req.body.name }, (err, user) => {

    if (err || !user || user.password != req.body.password) {
      res.status(403).json({error: 'Authentication failed.'});
    } else {
      const token = jwt.sign({ name: user.name, role: user.role }, config.secret, { expiresIn : 60*60*24 });

      res.status(200).json({token: token});
    }
  });
}

// set up endpoint functions and pass them via module.exports
module.exports = {
  authenticate
};