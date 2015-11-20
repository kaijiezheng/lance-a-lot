var db = require('./db/database');
var Client = db.Client;
var Job = db.Job;

exports.isLoggedIn = function(req, res) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next) {
  if (!exports.isLoggedIn(req)) {
    res.render('splash');
  } else {
    next();
  }
};

exports.createSession = function(req, res, user) {
  return req.session.regenerate(function() {
      req.session.user = user;
      res.redirect('/');
    });
};

/*
Post requests from the front-end can either be a requests to create a new job or to update a new job.
This function searches to see if the job that comes in from the request and either creates a new Job
record if it didn't already exist in the DB or updates the 'status' property of the job if the record already exists. 
*/
exports.createOrUpdateJob = function(req, res, job) {
  if (job === null) {
    //create
    exports.createJobDoc(req, res);
  } else {
    //update
    exports.updateJobDoc(req, res);
  }
};

/*
Finds the client id that corresponds to the client name from the POST request body.  
Uses found client id to create a new Job record in the database. 
*/
exports.createJobDoc = function(req, res) {
  // figure out various sequelize built-in promise callbacks
  // determine whether we need to send back status code along with redirect
  Client.findOne({ name: req.body.client }).then(function(client) {
    if (client) {
      var newJob = new Job({
        start: req.body.start,
        end: req.body.end,
        rate: req.body.rate,
        status: req.body.status,
        description: req.body.description
      });

      newJob.save().success(function() {
        res.redirect('/jobs');
      });
    }
  });
};

/*
Finds the Job record that matches the id in the request body and updates the status of the job. 
*/
exports.updateJobDoc = function (req, res) {
  Job.findOne({
    where: {
      _id: req.body._id
    }
  })
  .then(function(job) {
    if (job) {
      job.status = req.body.status;
      res.redirect('/');
    }
  });
}
