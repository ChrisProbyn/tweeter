"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
const userHelper    = require("../lib/util/user-helper")

module.exports = function makeDataHelpers(db) {
  return {

        // inserts the new tweet into the collection tweets
        // using a promise it calls a callback returning null and true
        saveTweet: function(newTweet, callback) {
            db.collection('tweets')
            .insert(newTweet)
            .then(callback(null, true));
        },

        // finds the documents in the collection tweets and then sorts them by the date created at
        getTweets: function(callback) {
            db.collection("tweets").find().toArray( (err, result) => {
                callback (null, result.sort((a, b) => a.created_at - b.created_at))
            });
        }
    };
}
