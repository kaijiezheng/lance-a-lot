var bookshelf = require('../database');
var bcrypt = require('bcrypt-nodejs');
var Job = require('./job');

var Freelancer = bookshelf.Model.extend({
  tableName: 'freelancers',
  hasTimestamps: true,
  jobs: function() {
    return this.hasMany('Job');
  },
  comparePassword: function(password, callback) {
    console.log(this.get('password'));
    console.log(password);
    bcrypt.compare(password, this.get('password'), function(err, match) {
      if (err) {
        throw new Error(err);
      } else {
        callback(match);
      }
    });
  }
});

bookshelf.model('Freelancer', Freelancer);

module.exports = Freelancer;
