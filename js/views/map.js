if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.MapView = Backbone.View.extend({
  initialize: function (opts) {
    this.config = opts;
    this.mapOptions = this.mergeMapOptions(opts);
  },

  render: function (callback) {
    var self = this;

    wax.tilejson(self.config.tileURL, function(tileJSON) {
      self.map = new L.Map(self.config.mapContainer, self.config.mapOptions)
        .addLayer(new wax.leaf.connector(tileJSON))
        .setView(self.config.mapOptions.center, self.config.mapOptions.zoom);
      
      self.map.attributionControl.addAttribution('Map Data: (c) <a href="http://www.openstreetmap.org">OpenStreetMap</a>');
      self.setEvents();
      if(callback && typeof callback === 'function') { callback(); }
    });
  },

  // Merge url params with settings set by user
  // URL params take preference
  mergeMapOptions: function(opts) {
    var self = this,
        mapParams = {},
        urlParams = decodeURIComponent(location.hash.substring(1)).trim().split('/');

    if(urlParams[1] && typeof Number(urlParams[1]) === "number") {
      mapParams = {
        zoom: urlParams[1],
        center: [urlParams[2], urlParams[3]]
      };
    }

    _.defaults(mapParams, self.mapOptions);

    return mapParams;
  },
  
  // Listen for changes as user pans and zoom on the map
  setEvents: function() {
    var self = this;

    self.map
      .on('zoomend', function(e) {
        self.updateURL();
      })
      .on('dragend', function(e) {
        self.updateURL();
      });
  },

  // Gets the current map center and zoom and sets
  // those values in the url
  // i.e. #zoom=12&lat=39.976&lng=-75.172
  updateURL: function() {
    var zoom = this.map.getZoom(),
        lat = this.map.getCenter().lat.toFixed(3),
        lng = this.map.getCenter().lng.toFixed(3),
        params = '/' + zoom + '/' + lat + '/' + lng;

    location.hash = params;
  }
});
