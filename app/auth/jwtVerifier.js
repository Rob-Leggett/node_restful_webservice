const jwt = require('jsonwebtoken');

const config = require("../configuration/config");

const TOKEN_NOT_FOUND = new Error();
TOKEN_NOT_FOUND.name = 'TokenNotFound';

module.exports = function jwtVerifier(req, res, next) {

  if(!req.headers.token) {
    next(TOKEN_NOT_FOUND)
  }

  jwt.verify(req.headers.token, config.secret, (err, decoded) => {

    if (err) {
      return next(err);
    }

    req.user = decoded;

    next();
  });

};