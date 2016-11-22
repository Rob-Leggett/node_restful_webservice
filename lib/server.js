const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const jsonParser = bodyParser.json();

/*
   ################################

         Customer Resource

   ################################
*/
app.get("/customers", jsonParser, (req, res) => {
  res.status(200).json({});
});

app.post("/customer/save", jsonParser, (req, res) => {
  res.status(200).json({});
});

app.delete("/customer/delete/:id", jsonParser, (req, res) => {
  res.status(200).json({});
});

/*
 ################################

         Server Listener

 ################################
 */

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});