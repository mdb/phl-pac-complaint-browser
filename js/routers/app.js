if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.Router = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  initialize: function (complaintsCollection, mapOpts) {
    app.complaintsCollection = complaintsCollection;
    app.mapView = new app.MapView(mapOpts);
  },

  index: function () {
    app.mapView.render(function () {
      app.complaintsCollection.each(function (complaint) {
        var pointView = new app.PointView({
          model: complaint,
          mapView: app.mapView
        }).render();
      });
    });
  }
});
