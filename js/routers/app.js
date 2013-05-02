if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "filtered/:age/:race/:sex/:type/:unit/:status/": "setFilter"
  },

  initialize: function (opts) {
    this.config = opts;
    app.complaintsCollection = new app.ComplaintsCollection(this.config.data);
    app.controlsCollection = new app.ControlsCollection(this.getControlsFromComplaints(app.complaintsCollection));
    app.mapView = new app.MapView(_.defaults(this.config, {
      collection: app.complaintsCollection,
      controls: app.controlsCollection,
      controlTraits: ['age', 'race', 'sex', 'type', 'unit', 'status']
    }));

    this.on("change:filter", this.filterView);
  },

  index: function () {
    app.mapView.render();
  },

  setFilter: function (age, race, sex, type, unit, status) {
    this.filters = arguments;
    this.trigger('change:filter');
  },

  itemInFilter: function (item) {
    var filters = this.filters,
        filtersLength = filters.length,
        inFilter,
        i;

    for (i=0; i<=filtersLength; i++) {
      if (filters[i] === 'all' || filters[i] === item.get(app.mapView.config.controlTraits[i])) {
        inFilter = true;
      } else {
        inFilter = false;
        break;
      }
    }

    return inFilter;
  },

  filterView: function () {
    if ($('#' + this.config.mapContainer).html() === '') {
      app.mapView.render();
    }

    app.complaintsCollection.reset(this.config.data);
    var self = this,
        filtered = _.filter(app.complaintsCollection.models, function (item) {
          return self.itemInFilter(item);
        });

    app.complaintsCollection.reset(filtered);
  },

  getTraits: function (collection, trait) {
    return _.uniq(collection.pluck(trait), false, function (someTrait) {
      return someTrait;
    });
  },

  getControlsFromComplaints: function (data) {
    var self = this,
        key,
        collection = [];

    for (key in data.models[0].attributes) {
      collection.push({
        trait: key,
        values: self.getTraits(data, key)
      });
    }

    return collection;
  }
});
