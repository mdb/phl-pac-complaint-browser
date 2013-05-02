if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.PointsView = Backbone.View.extend({
  initialize: function (opts) {
    this.mapView = opts.mapView;
    this.collection.on("reset", this.render, this);
  },

  pointElemSelector: 'img.leaflet-marker-icon, img.leaflet-marker-shadow',

  render: function () {
    var self = this;

    $(self.pointElemSelector).remove();

    self.collection.each(function (complaint) {
      var pointView = new app.PointView({
        model: complaint,
        mapView: self.mapView
      }).render();
    });
  }
});
