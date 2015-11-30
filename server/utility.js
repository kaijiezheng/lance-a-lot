// var db = require('./db/database');
// var Client = db.Client;
// var Job = db.Job;
var Client = require('./db/models/client');
var Freelancer = require('./db/models/freelancer');

exports.isLoggedIn = function(req, res) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next) {
  console.log('util.checkUser', exports.isLoggedIn(req));
  if (!exports.isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
};

exports.createSession = function(req, res, user) {
  return req.session.regenerate(function(error) {
    if (error) {
      console.log('Error in regenerating session');
    } else {
      console.log('Creating session');
      req.session.user = user;
      res.redirect('/');
    }
  });
};

exports.renderSignup = function(req, res) {
  res.render('signup');
};

exports.renderLogin = function(req, res) {
  res.render('login');
};
