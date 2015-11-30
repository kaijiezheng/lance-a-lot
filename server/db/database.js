// need to set this up for deployment
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'lancealot',
    charset: 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

bookshelf.knex.schema.hasTable('freelancers').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('freelancers', function (freelancer) {
      freelancer.increments('id').primary();
      freelancer.string('email', 255).unique();
      freelancer.string('password', 255);
      freelancer.timestamps();
    }).then(function (table) {
      console.log('Created Freelancer Table', table);
    });
  } else {
    console.log('Freelancer Table Already Exists');
  }
});

bookshelf.knex.schema.hasTable('clients').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('clients', function (client) {
      client.increments('id').primary();
      client.string('name', 255).unique();
      client.string('address', 255);
      client.string('phone');
      client.timestamps();
    }).then(function (table) {
      console.log('Created Client Table', table);
    });
  } else {
    console.log('Client Table Already Exists');
  }
});

bookshelf.knex.schema.hasTable('jobs').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('jobs', function (job) {
      job.increments('id').primary();
      job.date('start', 255); // also datetime and time
      job.date('end', 255);
      job.decimal('rate');
      job.boolean('status');
      job.string('description');
      job.integer('freelancer_id').unsigned().references('freelancers.id');
      job.integer('client_id').unsigned().references('clients.id');
      job.timestamps(); // creates both created_at and updated_at
    }).then(function (table) {
      console.log('Created Job Table', table);
    });
  } else {
    console.log('Job Table Already Exists');
  }
});

bookshelf.knex.schema.hasTable('times').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('times', function (time) {
      time.increments('id').primary();
      time.dateTime('start', 255);
      time.dateTime('stop', 255);
      time.decimal('total');
      time.integer('job_id').unsigned().references('jobs.id');
      time.timestamps();
    }).then(function (table) {
      console.log('Created Time Table', table);
    });
  } else {
    console.log('Time Table Already Exists');
  }
});

module.exports = bookshelf;
