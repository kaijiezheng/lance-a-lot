var bookshelf = require('../database');
var Job = require('./job');

var Client = bookshelf.Model.extend({
  tableName: 'clients',
  hasTimestamps: true,
  job: function() {
    return this.hasMany('Job');
  }
});

bookshelf.model('Client', Client);

module.exports = Client;
