var bookshelf = require('../database');
var Freelancer = require('../models/freelancer');

var Freelancers = bookshelf.Collection.extend({
  model: Freelancer
});

module.exports = Freelancers;
