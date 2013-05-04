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
      if (filters[i] === 'all') {
        inFilter = true;
      } else if (i === this.ageTraitIndex(app.mapView.config.controlTraits)) {
        if (this.withinAgeFilter(item, filters[i])) {
          inFilter = true;
        } else {
          inFilter = false;
          break;
        }
      } else if (filters[i] === item.get(app.mapView.config.controlTraits[i])) {
        inFilter = true;
      } else {
        inFilter = false;
        break;
      }
    }

    return inFilter;
  },

  withinAgeFilter: function (item, filter) {
    var minAge = parseInt(filter.replace(/\s+/g, ' ').split('-')[0], 10),
        maxAge = parseInt(filter.replace(/\s+/g, ' ').split('-')[1], 10),
        age = item.get('age'),
        withinFilter = false;
    
    if ((age >= minAge) && age <= maxAge) {
      withinFilter = true;
    }

    return withinFilter;
  },

  ageTraitIndex: function (traits) {
    var traitsLength = traits.length,
        traitIndex,
        i;

    for (i=0; i<=traitsLength; i++) {
      if (traits[i] === 'age') {
        traitIndex = i;
        break;
      }
    }

    return traitIndex;
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
