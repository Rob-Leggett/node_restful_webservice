const jwt = require('jsonwebtoken');

const config = require("../configuration/config");

function authenticate(req, res, next) {

  User.findOne({name: req.body.name}, (err, user) => {

    if (err) {
      res.status(500).json({error: 'Authentication failed.'});
    }

    if (!user || user.password != req.body.password) {
      res.status(403).json({error: 'Authentication failed.'});
    } else {

      const token = jwt.sign({ name: user.name, role: user.role }, config.secret, {
        expiresInMinutes: 1440 // expires in 24 hours
      });

      res.status(200).json({token: token});
    }
  });
}

// set up endpoint functions and pass them via module.exports
module.exports = {
  authenticate
};