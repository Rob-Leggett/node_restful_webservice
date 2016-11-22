const express = require("express");
const bodyParser = require("body-parser");

const customerController = require("./customer/CustomerController");

const app = express();

const jsonParser = bodyParser.json();

/*
   ################################

         Customer Resource

   ################################
*/
app.get("/customer", jsonParser, customerController.get);

app.get("/customer/:id", jsonParser, customerController.get);

app.post("/customer", jsonParser, customerController.save);

app.put("/customer/:id", jsonParser, customerController.update);

app.delete("/customer/:id", jsonParser, customerController.remove);

/*
 ################################

         Server Listener

 ################################
 */

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});