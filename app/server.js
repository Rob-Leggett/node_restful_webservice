const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('express-jwt');
const morgan = require('morgan');

const config = require("./configuration/config");

const tokenController = require("./token/tokenController");
const customerController = require("./customer/customerController");
const exceptionHandler = require("./exceptionHandler");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev')); // logging requests


const jwtSecret = jwt({secret: new Buffer(config.secret, 'base64')});

// ######### Token Routes ###########

app.get("/token", tokenController.get);

// ######### Customer Routes ###########

app.get("/customer", [jwtSecret], customerController.get);

app.get("/customer/:id", [jwtSecret], customerController.get);

app.post("/customer", [jwtSecret], customerController.save);

app.put("/customer/:id", [jwtSecret], customerController.update);

app.delete("/customer/:id", [jwtSecret], customerController.remove);

// ######### Exception Handling ###########

app.use(exceptionHandler.handle);

// ######### Server Listener ###########

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});