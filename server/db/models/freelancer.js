var bookshelf = require('../database');
var Job = require('./job');

var Freelancer = bookshelf.Model.extend({
  tableName: 'freelancers',
  hasTimestamps: true,
  jobs: function() {
    return this.hasMany('Job');
  }
    // initialize: function(){
    //   this.on('creating', this.hashPassword);
    // },
    // freelancer.increments('id').primary();
    //   freelancer.string('email', 255);
    //   freelancer.string('password', 255);
    //   freelancer.timestamps();
    // comparePassword: function(attemptedPassword, callback) {
    //   bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    //     callback(isMatch);
    //   });
    // },
    // hashPassword: function(){
    //   var cipher = Promise.promisify(bcrypt.hash);
    //   return cipher(this.get('password'), null, null).bind(this)
    //     .then(function(hash) {
    //       this.set('password', hash);
    //     });
    // }
});

bookshelf.model('Freelancer', Freelancer);

module.exports = Freelancer;
