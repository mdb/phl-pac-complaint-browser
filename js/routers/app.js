if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.Router = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  initialize: function (complaintsCollection, mapOpts) {
    app.complaintsCollection = complaintsCollection;
    app.controlsCollection = new app.ControlsCollection(this.getControlsFromComplaints(complaintsCollection.models));
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

      app.controlsCollection.each(function (control) {
        var controlView = new app.ControlView({
          model: control,
          traits: ['race', 'age', 'sex', 'type', 'unit', 'status']
        }).render();
      });
    });
  },

  getControlsFromComplaints: function (data) {
    var dataLength = data.length,
        key,
        i,
        collection = [];

    for (i=0; i<=dataLength; i++) {
      if (i===0) {
        for (key in data[i].attributes) {
          collection.push({
            trait: key,
            values: [data[i][key]]
          });
        }
      } else {
        if (data[i] && data[i].attributes) {
          for (key in data[i].attributes) {
            var control = _.find(collection, function (item) {
              return item.trait === key;
            });

            if (!_.contains(control.values, data[i].get(key))) {
              if (!data[i].get(key) && !_.contains(control.values, 'Unreported')) {
                control.values.push('Unreported');
              } else {
                control.values.push(data[i].get(key));
              }
            }
          }
        }
      }
    }

    return collection;
  }
});
