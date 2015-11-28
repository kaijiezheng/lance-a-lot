// Clients List View --> connected to Clients Collection

/*
For templates, look at client/views/backbone_templates.
*/

Lancealot.ClientsListView = Backbone.View.extend({

  tagName: "table",
  className: 'ui striped green table',

  template: Templates['clienttable'],

  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },

  addOne: function(item){
    console.log(item);
    var view = new Lancealot.ClientView({ model: item });
    this.$el.append(view.render().el);
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  render: function(){
    this.$el.empty();
    this.$el.html(this.template());
    return this;
  }

});
