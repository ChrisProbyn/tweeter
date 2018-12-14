"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
const userHelper    = require("../lib/util/user-helper")
const ObjectId =require("mongodb").ObjectId;


module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {


        db.collection('tweets')
        .insert(newTweet)
        .then(callback(null, true));

    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
        db.collection("tweets").find().toArray( (err, result) => {
            callback (null, result.sort((a, b) => a.created_at - b.created_at))

        });


    }

  };
}
