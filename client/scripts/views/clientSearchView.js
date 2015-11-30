// ClientSearch View --> connected to Jobs collection

/*
For templates, look at client/views/backbone_templates.
*/

Lancealot.ClientSearchView = Backbone.View.extend({

  // tagName: 'form',
  className: 'ui form',
  template: _.template('<form><div class="field"><label>Search by Client:</label><input id="clientSearch" class="ui input" type="text"/></div></form><br/>'),

  initialize: function() {
    this.render();
  },

  render: function(){
    return this.$el.html(this.template());
  },

});