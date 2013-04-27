if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.Point = Backbone.View.extend({
  initialize: function () {
    this.template = _.template($('#tooltip-template').html());
  },

  render: function () {
    var self = this;

    L.marker([self.model.get('latitude'), self.model.get('longitude')])
      .addTo(app.map)
      .bindPopup(self.template({
        type: self.model.get('type'),
        race: self.model.get('race'),
        sex: self.model.get('sex'),
        age: self.model.get('age'),
        date: self.model.get('date'),
        unit: self.model.get('unit'),
        action: self.model.get('action'),
        status: self.model.get('status')
      }));
  }

});
