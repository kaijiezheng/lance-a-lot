// APP

/*
For templates, look at client/views/backbone_templates.

This is the client-side homebase. It initializes the router,
adds click/submit listeners, and sets up actions for when
the user tries navigating to another page.

View this module in tandem with routers.js
*/

window.Lancealot = Backbone.View.extend({

  template: Templates['layout'],

  events: {
    // 'click a #home':  'renderIndexView',
    // 'click a #logout': 'renderAddView',
    // 'click a #clients': 'renderClientsView',
    // 'click a #addClient': 'renderClientEntryView',
    // 'click a #productivity': 'renderTimesView',
    'submit #addJob': 'renderIndexView',
    'submit #addClient': 'renderAddView'
  },

  initialize: function(){
    $("#container").append(this.render().el);

    this.router = new Lancealot.Router({ el: this.$el.find('#container') });
    
    Backbone.history.start({ pushState: true });
    
    //Prevents refresh of page when a link is clicked
    $(document).on("click", "a:not([data-bypass])", function(evt) {
      var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
      var root = location.protocol + "//" + location.host + Backbone.history.options.root;

      if (href.prop && href.prop.slice(0, root.length) === root) {
        evt.preventDefault();
        Backbone.history.navigate(href.attr, true);
      }
    });

    //Highlights current active tab
      $('.item').click(function(){
        $('.active').removeClass('active');
         $(this).addClass('active');
      });

  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  renderIndexView: function(e) {
    // e && e.preventDefault();
    this.router.navigate('/jobslist', { trigger: true });
  },

  renderClientsView: function(e) {
    // e && e.preventDefault();
    this.router.navigate('/clientslist', { trigger: true });
  },

  renderClientEntryView: function(e) {
    // e && e.preventDefault();
    this.router.navigate('/addclient', { trigger: true });
  },

  renderAddView: function(e) {
    // e && e.preventDefault();
    this.router.navigate('/addjob', { trigger: true });
  },

  renderTimesView: function(e) {
    // e && e.preventDefault();
    this.router.navigate('/productivity', { trigger: true });
  }

});
