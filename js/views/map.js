if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.MapView = Backbone.View.extend({
  el: $('#app-container'),

  initialize: function (opts) {
    this.config = opts;
  },

  render: function () {
    var self = this;

    wax.tilejson(self.config.tileURL, function(tile) {
      self.drawMap(tile);
      app.pointsView = new app.PointsView({
        mapView: self,
        collection: self.collection
      });
      app.pointsView.render();
      self.renderControls();
    });
  },

  renderControls: function () {
    var self = this;

    self.config.controls.each(function (control) {
      var controlView = new app.ControlView({
        model: control,
        controlTraits: self.config.controlTraits
      }).render();
    });
  },

  drawMap: function (tile) {
    var self = this;

    self.map = new L.Map(self.config.mapContainer, self.config.mapOptions)
      .addLayer(new wax.leaf.connector(tile))
      .setView(self.config.mapOptions.center, self.config.mapOptions.zoom);

    self.map.attributionControl.addAttribution('Map Data: (c) <a href="http://www.openstreetmap.org">OpenStreetMap</a>');
  }
});
