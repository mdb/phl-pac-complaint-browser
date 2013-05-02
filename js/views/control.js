if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.ControlView = Backbone.View.extend({
  el: $('#controls'),

  events: {
    'submit form#control-form': 'submit'
  },

  initialize: function (opts) {
    this.template = _.template($('#control-template').html());
    this.traits = opts.controlTraits || [];
  },

  render: function () {
    if (_.contains(this.traits, this.model.get('trait'))) {
      this.$el.find('form div').append(this.template({
        trait: this.model.get('trait'),
        values: this.model.get('values')
      }));
      return this;
    }
  },

  getParams: function ($array) {
    var i,
        arrLength = $array.length
        values = [];

    for (i=0; i<=arrLength; i++) {
      values.push($($array[i]).attr('value'));
    }

    return values;
  },

  buildURL: function (params) {
    return params.join('/')
  },

  submit: function (e) {
    e.preventDefault();
    var params = this.getParams(this.$('select :selected'));

    location.hash = 'filtered/' + this.buildURL(params);
    //TODO: why doesn't this work?
    //app.router.navigate('filtered/' + this.buildURL(params));
  }
});
