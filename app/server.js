const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');

const authRouter = require("./auth/authRouter");
const customerRouter = require("./customer/customerRouter");
const exceptionHandler = require("./exceptionHandler");

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