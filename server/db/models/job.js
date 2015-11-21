var bookshelf = require('../database');
var Freelancer = require('./freelancer');
var Client = require('./client');

var Job = bookshelf.Model.extend({
  tableName: 'jobs',
  hasTimestamps: true,
  freelancer: function() {
    return this.belongsTo('Freelancer');
  },
  client: function() {
    return this.belongsTo('Client');
  }
});

bookshelf.model('Job', Job);

module.exports = Job;
