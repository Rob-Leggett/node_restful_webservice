const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const mongoose = require('mongoose');

const config = require("./configuration/config");
const authRouter = require("./auth/authRouter");
const customerRouter = require("./customer/customerRouter");
const exceptionHandler = require("./exceptionHandler");

// ######### Database Connection ###########

mongoose.connect(config.database); // connect to database

// ######### Express Application ###########

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev')); // logging requests

// ######### Token Routes ###########

app.use("/authenticate", authRouter);

// ######### Customer Routes ###########

app.use("/customer", customerRouter);

// ######### Exception Handling ###########

app.use(exceptionHandler.handle);

// ######### Server Listener ###########

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});

// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
// https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications