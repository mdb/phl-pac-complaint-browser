if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.Control = Backbone.View.extend({
  initialize: function () {
    this.template = _.template($('#control-template').html());
    this.dispatcher = app.dispatcher;
  },

  render: function () {
   this.$el.html(this.template());  
   return this;
  }
});
