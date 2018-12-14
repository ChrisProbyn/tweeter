"use strict";
const MongoClient = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost:27017/tweeter";

const mongo = new MongoClient(dbUrl)
const ObjectId =require("mongodb").objectId;
// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const makeDataHelpers = require("./lib/data-helpers.js");
const makeTweetsRoutes = require("./routes/tweets")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



mongo.connect(dbUrl, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${dbUrl}`);
    throw err;
  }

  var DataHelpers = makeDataHelpers(db);
  var tweetsRoutes = makeTweetsRoutes(DataHelpers);
  app.use("/tweets", tweetsRoutes);
});




app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);

});
