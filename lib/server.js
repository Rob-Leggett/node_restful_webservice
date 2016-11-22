const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('express-jwt');

const customerController = require("./customer/CustomerController");
const tokenController = require("./token/TokenController");

const app = express();

const jsonParser = bodyParser.json();
const jwtSecret = jwt({secret: new Buffer('shhhhhhared-secret', 'base64')});

/*
 ################################

        Token Resource

 ################################
 */
app.get("/token", [jsonParser], tokenController.get);

/*
   ################################

         Customer Resource

   ################################
*/
app.get("/customer", [jsonParser, jwtSecret], customerController.get);

app.get("/customer/:id", [jsonParser, jwtSecret], customerController.get);

app.post("/customer", [jsonParser, jwtSecret], customerController.save);

app.put("/customer/:id", [jsonParser, jwtSecret], customerController.update);

app.delete("/customer/:id", [jsonParser, jwtSecret], customerController.remove);

/*
 ################################

         Error Handling

 ################################
 */
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ 'error': 'invalid token supplied'});
  }
});

/*
 ################################

         Server Listener

 ################################
 */

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});

// REVIEW https://github.com/auth0/express-jwt, http://expressjs.com/en/api.html