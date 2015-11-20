var Sequelize = require("sequelize");

// need to set this up for deployment
// var orm = new Sequelize("lancealot", "root", "pass");
var orm = new Sequelize('postgres://root:pass@localhost.com:5432/lancealot');

var Freelancer = orm.define('Freelancer', {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  name: Sequelize.STRING
});

var Client = orm.define('Client', {
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  phone: Sequelize.STRING
});

var Job = orm.define('Job', {
  start: Sequelize.DATE,
  end: Sequelize.DATE,
  rate: Sequelize.INTEGER,
  description: Sequelize.STRING(1234)
});

var Time = orm.define('Time', {
  start: Sequelize.DATE,
  end: Sequelize.DATE
});

Freelancer.hasMany(Job);
Client.hasMany(Job);
Job.hasMany(Time);

Freelancer.sync({ force: true });
Client.sync({ force: true });
Job.sync({ force: true });
Time.sync({ force: true });

exports.Freelancer = Freelancer;
exports.Client = Client;
exports.Job = Job;
exports.Time = Time;

// // Use cases
// var newFL = Freelancer.build({
//   email: "aol@aol.com",
//   name: "Fossil",
//   password: "password"
// });

// newFL.save().success(function() {
//   // callback

// });

// Freelancer.findAll({ where: { name: "Fossil" } }).success(function(flers) {
//   // callback
// });

// Freelancer.findOrCreate({
//   where: { name: "Elon", email: "elon@tesla.com", password: "complicated" }
// }).then(function(fler) {
//   // callback
// });
