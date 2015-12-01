var bookshelf = require('../database');
var Freelancer = require('./freelancer');
var Client = require('./client');
var Time = require('./time');

var Job = bookshelf.Model.extend({
  tableName: 'jobs',
  hasTimestamps: true,
  freelancer: function() {
    return this.belongsTo('Freelancer');
  },
  client: function() {
    return this.belongsTo('Client');
  },
  times: function() {
    return this.hasMany('Time');
  }
});

bookshelf.model('Job', Job);

module.exports = Job;
