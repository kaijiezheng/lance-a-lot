// Router

/*
Look at app.js to see where this router comes into play.
Based on the specified route (eg '/', '/add'), the router
will render the appropriate view (eg 'AppView', 'JobEntryView')
*/

Lancealot.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$el = options.el;
  },

  routes: {
    '': 'index',
    'addjob': 'addJob',
    'addclient': 'addClient',
    'clients': 'showClients',
    'times': 'showTimes'
  },

  swapView: function(view){
    this.$el.html(view.render().el);
  },

  index: function(){
    var jobs = new Lancealot.Jobs();
    var appView = new Lancealot.AppView({ collection: jobs });
    this.swapView(appView);
    $("#bargraph").hide()
  },

  addJob: function(){
    var clients = new Lancealot.Clients();
    this.swapView(new Lancealot.JobEntryView({collection: clients}));
  },

  addClient: function(){
    this.swapView(new Lancealot.ClientEntryView());
  },

  showClients: function(){
    var clients = new Lancealot.Clients();
    var clientsView = new Lancealot.ClientsListView({ collection: clients });
    this.swapView(clientsView);
  },

  showTimes: function() {
    var times = new Lancealot.Times();
    var timesView = new Lancealot.TimesView(/*{ collection: times }*/);
    $("#container").append(timesView.el)
  }
});
