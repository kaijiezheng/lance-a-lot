var bcrypt = require('bcrypt-nodejs');
var util = require('./utility');
var request = require('request');

var db = require('./db/database');
var Freelancer = db.Freelancer;
var Client = db.Client;
var Job = db.Job;
var Time = db.Time;

/*
fetchClients is called when /clients path receives get request
Finds all clients in the database and responds with result of query
*/
exports.fetchClients = function(req, res) {
  Client.findAll().then(function(clients) {
    res.send(200, clients);
  });
};

/*
Builds new Client document with request properties and saves it to the db
*/
exports.addClient = function (req, res) {
  var newClient = new Client({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone
  });

  newClient.save().then(function (newClient) {
    console.log('added new client: ', newClient);
    res.send(200, newClient);
  });
};

/*
fetchJobs is called when /jobs path receives get request
Finds all jobs in the database, replaces client_id with an object that include client Id and name
Responds with result of query
*/
exports.fetchJobs = function (req, res) {
  Job.findAll().then(function(jobs) {
    res.send(jobs)
  });
};

/*
Builds new Job document with request properties and saves it to the db
*/
exports.addJob = function (req, res) {
  //call createJobDoc first to find client id to use to create job document
  console.log('req body in addJob: ', req.body);
  //check if id already exists

  Job.findById(req.body._id).then(function(job) {
    util.createOrUpdateJob(req, res, job);
  });
};

/*
loginUser is called when /login receives post request
Determines if user exists in db; if not, redirects to /signup
If user exists, sends get request with custom options to toggl api
Receives all toggl info for later use, and creates user session
*/
exports.loginUser = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email: email })
    .exec(function (err, user) {
      if (user === null) {
        res.redirect('/signup');
      } else {
        // need to bcrypt password and check
        // create session if password matches
        util.createSession(req, res, user);
      }
  });
};

/*
signupUser is called when /signup receives post request
Determines if user exists in db; if not, adds user to db
Post request is then sent to toggle api to register user account
Api token is taken from toggl resp to build new User document, then saves it
If save is successful, new user session is created
If user exists, redirect to /login
*/
exports.signupUser = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email: email })
    .exec(function (err, user) {
      if (user === null) {

        // bcrypt password
        var newUser = new User({
          email: email,
          password: password
        });

        newUser.save().success(function () {
          util.createSession(req, res, newUser);
        });
      } else {
        console.log('Account already exists');
        res.redirect('/login');
      }
    });
};
