// Job View --> connected to Job Model

/*
For templates, look at client/views/backbone_templates.

Note: render and toggleComplete help deal with 
checking and unchecking checkboxes
*/

Lancealot.JobView = Backbone.View.extend({

  tagName: 'tr',

  events: {
    'click input:checkbox': 'toggleComplete',
    'click .start': 'start',
    'click .stop': 'stop'
  },

  template: Templates['job'],

  initialize: function() {
    this.model.on('change', this.render, this);
  },

  render: function(val) {

    // grabbing our job model's attributes
    var modelData = this.model.toJSON();
    console.log(this.model.toJSON());

    // adding the "checked" property to our model
    // will tell our input HTML tag whether to check off the box or not (true v. false)
    modelData.checked = modelData.status ? 'checked' : '';

    // adding "formattedDate" properties will format the date to look nice(ish)
    var startDate = new Date(modelData.start);
    var endDate = new Date(modelData.end);

    modelData.formattedStart = startDate.toDateString();
    modelData.formattedEnd = endDate.toDateString();
    modelData.timer = 0;

    this.$el.html(this.template(modelData));

    return this;
  },

  // updates status of the job in DB (true v. false)
  toggleComplete: function(e) {
    var checked = e.target.checked;
    var client = this.model.attributes.client.name;
    this.model.save({status: checked});
  },

  timer: false,
  startTime: 0,
  startDate: undefined,
  endDate: undefined,
  elapsedTime: 0,

  maintain: function() {
    if (this.timer) {
      this.$('.start').addClass('stop');
      this.$('.start').text('Stop');
    } else {
      this.$('.start').removeClass('stop');
      this.$('.start').text('Start');
      //this.$('.totalTime').text(moment.duration(this.model.get('elapsedTime')).humanize());
    }
  },

  //timer control
  incrementTimer: function() {
    this.elapsedTime = (Date.now() - this.startTime) / 1000;
    time = moment.duration(this.model.get('elapsedTime'), 'seconds').humanize();
    this.model.set("currentTimer", time);
    this.maintain();
  },
  
  start: function() {
    if (!this.timer) {
      this.timer = true;
      this.startDate = (new Date).toDateString();
      this.startTime = Date.now();
      window.setInterval(_.bind(this.incrementTimer, this), 1000);
      this.maintain();
    }
  },
  
  stop: function() {
    this.timer = false;
    this.endDate = (new Date).toDateString();
    var totalLabor = this.model.get("laborTime");
    this.model.set({laborTime: (totalLabor + (Date.now() - this.startTime))});
    this.elapsedTime = 0;
    console.log(this.model.get('laborTime'));
    this.maintain();
  }

});