const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Post = require("../models/post");

exports.rootGetRequest = function (req, res, next) {
  if (req.user) {
    Post.find({})
      .populate("author")
      .exec((err, posts) => {
        if (err) {
          return next(err);
        }
        res.render("index", { title: "Board", user: req.user, posts: posts });
      });
  } else {
    Post.find({}).exec((err, posts) => {
      if (err) {
        return next(err);
      }
      res.render("index", { title: "Board", posts: posts });
    });
  }
};

exports.signUpGetRequest = function (req, res, next) {
  res.render("sign-up", { title: "Board" });
};

exports.signUpPostRequest = [
  body("fname").trim().isLength({ min: 1 }).escape(),
  body("lname").trim().isLength({ min: 1 }).escape(),
  body("email").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 8 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.render("sign-up", { old: req.body });
      return;
    }
    bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
      // Store hash in your password DB.
      const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword,
      });

      user.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/login");
      });
    });
  },
];

exports.loginGetRequest = function (req, res, next) {
  res.render("login", { title: "Board" });
};

exports.loginPostRequest = [
  body("email").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 8 }).escape(),
  (req, res, next) => {
    console.log("data sanitazation and validation");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("login");
      return;
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
];

exports.logoutGetRequest = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  next();
};
