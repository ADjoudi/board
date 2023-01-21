#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/?retryWrites=true&w=majority"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
  if (!userArgs[0].startsWith('mongodb')) {
      console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
      return
  }
  */
var async = require("async");
var Post = require("./models/post");
const dotenv = require("dotenv");
dotenv.config();
var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var posts = [];

function postCreate(author, text, date, cb) {
  postDetails = { author: author, text: text, date: date };
  var post = new Post(postDetails);

  post.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Post: " + post);
    posts.push(post);
    cb(null, post);
  });
}

function createPosts(cb) {
  async.parallel(
    [
      function (callback) {
        postCreate(
          "63ca647561151caf4d03f54e",
          "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
          "9781473211896",
          callback
        );
      },
      function (callback) {
        postCreate(
          "63ca647561151caf4d03f54e",
          "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
          "9781473211896",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createPosts],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
