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
        values: this.getValues(this.model)
      }));
      return this;
    }
  },

  getValues: function (model) {
    var trait = model.get('trait'),
        values = model.get('values');

    if (trait === 'age') {
      return ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90-99'];
    } else {
      return values;
    }
  },

  getParams: function ($array) {
    var i,
        arrLength = $array.length,
        values = [];

    for (i=0; i<arrLength; i++) {
      var value = $($array[i]).attr('value');

      values.push(value.replace(/ /g, '-'));
    }

    return values;
  },

  buildURL: function (params) {
    return params.join('/');
  },

  submit: function (e) {
    e.preventDefault();
    var params = this.getParams(this.$('select :selected'));

    location.hash = 'filtered/' + this.buildURL(params) + '/';
    //TODO: why doesn't this work?
    //app.router.navigate('filtered/' + this.buildURL(params));
  }
});
