if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.ControlView = Backbone.View.extend({
  initialize: function (opts) {
    this.template = _.template($('#control-template').html());
    this.traits = opts.traits || [];
  },

  el: $('#controls form'),

  render: function () {
    if (_.contains(this.traits, this.model.get('trait'))) {
      this.$el.append(this.template({
        trait: this.model.get('trait'),
        values: this.model.get('values')
      }));
      return this;
    }
  }
});
