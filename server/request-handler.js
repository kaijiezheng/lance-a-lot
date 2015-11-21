var bcrypt = require('bcrypt-nodejs');
var util = require('./utility');
var request = require('request');

// var db = require('./db/database');
// var Freelancer = db.Freelancer;
// var Client = db.Client;
// var Job = db.Job;
// var Time = db.Time;
var Freelancer = require('./db/models/freelancer');
var Client = require('./db/models/client');
var Job = require('./db/models/job');
// var Time = require('./models/time');

/*
fetchClients is called when /clients path receives get request
Finds all clients in the database and responds with result of query
*/
exports.fetchClients = function(req, res) {
  new Client()
  .fetchAll()
  .then(function(clients) {
    console.log('Fetched all clients successfully');
    res.status(200).send(clients);
  })
  .catch(function(err) {
    console.log('Error in retrieving clients:', err.message);
  });
};

/*
Builds new Client document with request properties and saves it to the db
*/
exports.addClient = function (req, res) {
  new Client({ name: req.body.name })
  .fetch()
  .then(function(client) {
    if (client) {
      console.log('Client is already in our database');
      res.redirect('/addclient');
    } else {
      new Client({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
      })
      .save()
      .then(function(client) {
        console.log('Saved client successfully');
        res.status(200).send(client);
      })
      .catch(function(err) {
        console.log('Error while saving new client:', err.message);
        res.redirect('/addclient');
      });
    }
  })
  .catch(function(err) {
    console.log('Error in trying to see if client already exists in database:', err.message);
    res.redirect('/addclient');
  });
};

/*
fetchJobs is called when /jobs path receives get request
Finds all jobs in the database, replaces client_id with an object that include client Id and name
Responds with result of query
*/
exports.fetchJobs = function (req, res) {
  new Job()
  .fetchAll({
    withRelated: [
      'client'
    ]
  })
  .then(function(jobs) {
    console.log('Fetched all jobs successfully');
    console.log(jobs);
    res.status(200).send(jobs);
  })
  .catch(function(err) {
    console.log('blahblah');
    console.log('Error in retrieving jobs:', err.message);
  });
};

/*
Builds new Job document with request properties and saves it to the db
*/
exports.addJob = function (req, res) {
  new Client({
    name: req.body.client
  })
  .fetch()
  .then(function(client) {
    if (client) {
      new Job({
        description: req.body.description,
        rate: req.body.rate,
        start: new Date(req.body.start),
        end: new Date(req.body.end),
        client_id: client.id,
        freelancer_id: req.session.user.id
      })
      .fetch()
      .then(function(job) {
        if (!job) {
          new Job({
            description: req.body.description,
            rate: req.body.rate,
            start: new Date(req.body.start),
            end: new Date(req.body.end),
            status: false,
            client_id: client.id,
            freelancer_id: req.session.user.id
          })
          .save()
          .then(function(job) {
            console.log('Saved job successfully');
            res.status(200).send(job);
          })
          .catch(function(err) {
            console.log('Error in saving job', err.message);
          });
        } else {
          console.log('Job already exists for this client, updating status instead');
          job.status = req.body.status;
          res.redirect('/');
        }
      })
      .catch(function(err) {
        console.log('Error in detecting if job is already in database:', err.message);
        res.redirect('/addjob');
      })
    } else {
      console.log('Could not find client for this job');
      res.redirect('/addjob');
    }
  })
  .catch(function(err) {
    console.log('Error in fetching client id to add job', err.message);
    res.redirect('/addjob');
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
  console.log(password);
  new Freelancer({ email: email })
  .fetch()
  .then(function(freelancer) {
    if (freelancer) {
      // change to compare bcrypt
      if (freelancer.get('password') === password) {
        console.log('Passwords match');
        util.createSession(req, res, freelancer);
      } else {
        console.log('Wrong password');
        res.redirect('/login');
      }
    } else {
      console.log('Could not find account');
      res.redirect('/signup');
    }
  })
  .catch(function(err) {
    console.log('Error in retrieving account from database:', err.message);
    res.redirect('/login');
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
exports.signupUser = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  new Freelancer({
    email: email,
  })
  .fetch()
  .then(function(freelancer) {
    if (!freelancer) {
      new Freelancer({
        email: email,
        password: password
      })
      .save()
      .then(function(freelancer) {
        console.log('Saved freelancer successfully');
        util.createSession(req, res, freelancer);
      })
      .catch(function(err) {
        console.log('Error in saving freelancer', err.message);
        res.redirect('/signup');
      });
    } else {
      console.log('Freelancer already exists');
      res.redirect('/signup');
    }
  })
  .catch(function(err) {
    console.log('Error in seeing if freelancer is in database:', err.message);
    res.redirect('/signup');
  });
};
