"use strict";
//setup for mongo, express, body parser, and brings in data helpers and tweets routes
const MongoClient = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost:27017/tweeter";
const mongo = new MongoClient(dbUrl);
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const makeDataHelpers = require("./lib/data-helpers.js");
const makeTweetsRoutes = require("./routes/tweets")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//starts a mongo connection
mongo.connect(dbUrl, (err, db) => {
  //error handling
  if (err) {
    console.error(`Failed to connect: ${dbUrl}`);
    throw err;
  }
  //uses the existing functions but now using the mongo database
  var DataHelpers = makeDataHelpers(db);
  var tweetsRoutes = makeTweetsRoutes(DataHelpers);
  app.use("/tweets", tweetsRoutes);
});



//console log to tell us that express is listening on port name
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);

});
