var bookshelf = require('../database');
var Job = require('./job');

var Time = bookshelf.Model.extend({
  tableName: 'times',
  hasTimestamps: true,
  job: function() {
    return this.belongsTo('Job');
  }
});

bookshelf.model('Time', Time);

module.exports = Time;
