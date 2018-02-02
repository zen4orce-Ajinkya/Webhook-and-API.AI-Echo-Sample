"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {

  
  var Name =
  req.body.result &&
  req.body.result.parameters &&
  req.body.result.parameters.echoText
    ? req.body.result.parameters.echoText
    : "";
  
  console.log('**********'); 
  var IntegerNumber =
  req.body.result &&
  req.body.result.parameters &&
  req.body.result.parameters.Number
    ? req.body.result.parameters.Number
    : "";
  
  let SalesforceConnection = require("node-salesforce-connection");

 
(async () => {
 
  let sfConn = new SalesforceConnection();
 
  await sfConn.soapLogin({
    hostname: "login.salesforce.com",
    apiVersion: "39.0",
    username: "ajinkya33@zen4orce.com",
    password: "Ajinkya@33ymtTsmynVY7EUOcZJeXlU2VV",
  });
  
if(Name != '' && Name != 'undefined'){

      let myNewAccount = {Name: Name};
      let result = await sfConn.rest("/services/data/v39.0/sobjects/Account",
      {method: "POST", body: myNewAccount});

      return res.json({
      speech: result.id,
      displayText: result.id,
      source: "webhook-echo-sample"
      });

   }else{
  

    let myNewAccount = {Name:'TestName', Jigsaw: IntegerNumber};
    let result = await sfConn.rest("/services/data/v39.0/sobjects/Account",
    {method: "POST", body: myNewAccount});

    return res.json({
    speech: result.id,
    displayText: result.id,
    source: "webhook-echo-sample"
    });
   }
  
})().catch(ex => console.error(ex.stack));

});
