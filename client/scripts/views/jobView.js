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
    'click .start': function(e) {
      this.start(e);
      this.handleSubmit(e);
    },
    //'submit': 'handleSubmit',
    'click .stop': function(e) {
      this.stop(e);
      this.handleSubmit(e);
    },
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

  startTime: 0,
  startDate: undefined,
  endDate: undefined,
  elapsedTime: 0,
  timeIt: undefined,
  storeStartTime: undefined,
  totalTime: undefined,

  handleSubmit: function(e) {
    e.preventDefault();
    var jobID = this.model.id;
    var started; 
    if (this.timer) {
     started = moment().format('YYYY-MM-DD HH:mm:ss');
     this.storeStartTime = started
     var time = new Lancealot.Time({
     start: started,
     job_id: jobID
    });

    time.save({});
    } else {
      console.log('Should be false: ', this.timer);
      console.log(this.model.attributes);
      e.preventDefault();
      var stopTime = moment().format('YYYY-MM-DD HH:mm:ss');
      console.log('This is the ID:', this.model.id);
    
      var time = new Lancealot.Time({
      start: this.storeStartTime,
      stop: stopTime,
      job_id: jobID
    });
    
    time.save({});
    console.log(stopTime);
 }

  },

  maintain: function() {
    if (this.model.get('timer')) {
      this.$('.start').attr('value', 'Stop');
      this.$('.start').attr('class', 'stop');
    } else {
      this.$('.start').attr('value', 'Start');
      this.$('.start').attr('class', 'start');
    }
  },

  //timer control
  incrementTimer: function() {
    this.elapsedTime = (Date.now() - this.startTime) / 1000;
    var time = moment.duration(this.elapsedTime, 'seconds').humanize();
    this.model.set("currentTimer", time);
    this.maintain();
  },
  
  start: function() {
    if (!this.model.get('timer')) {
      this.model.set('timer', true);
      this.startTime = Date.now();
      this.timeIt = window.setInterval(_.bind(this.incrementTimer, this), 1000);
      this.maintain();
    }
  },
  
  stop: function() {
    console.log("stopped");
    if (this.model.get('timer')){
      this.model.set('timer', false);
      clearInterval(this.timeIt);
      var added = (this.totalTime || 0);
      this.totalTime = (Date.now() - this.startTime) + added;
      this.startTime = 0;
      this.model.set('currentTimer', 0);
      this.model.set('displayTotal', moment.duration((this.totalTime / 1000), 'seconds').humanize())
      this.maintain();
    }
  }

});