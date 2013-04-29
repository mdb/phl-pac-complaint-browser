if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.PointView = Backbone.View.extend({
  initialize: function (opts) {
    this.mapView = opts.mapView;
    this.template = _.template($('#tooltip-template').html());
  },

  render: function () {
    var self = this;

    L.marker([self.model.get('latitude'), self.model.get('longitude')])
      .addTo(self.mapView.map)
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
